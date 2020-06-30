require('dotenv').config();

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const logger = require('./utils/logger');
const moment = require('moment-timezone');

const chat = require('./routes/chat.route');
const image = require('./routes/image.route');

const PORT = process.env.PORT || 3330;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  logger.info('Connected to database...');
});

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false}))
app.use(express.json({ limit: '5mb' }));
app.use(helmet());

app.get('/', function(req, res) {
  const July0518 = moment.tz('2020-07-05T17:55:00', 'America/Sao_Paulo').format('x');
  const July0520 = moment.tz('2020-07-05T20:10:00', 'America/Sao_Paulo').format('x');
  const now = moment().tz('America/Sao_Paulo').format('x');

  if((now > July0518) && (now < July0520)) {
    res.sendFile(path.join(__dirname, 'www', '20200705.html'));
  } else {
    res.sendFile(path.join(__dirname, 'www', 'index.logo.html'));
  }
});

app.use(express.static(path.join(__dirname, 'www')));

chat(app, io);
image(app, io);

io.on('connection', (socket) =>{
  socket.on('disconnect', () => {
    io.emit('counter', { count: io.engine.clientsCount });
  });

  logger.info(`${io.engine.clientsCount} users connected`)
  io.emit('counter', { count: io.engine.clientsCount });
});

const server = http.listen(PORT, () => {
  logger.info(`Listening @ ${PORT}`);
});

module.exports = server;
