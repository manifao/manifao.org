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
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(express.json({ limit: '5mb' }));
app.use(helmet());

app.get('/', function(req, res) {
  const startTime = moment.tz('2021-04-01T18:50:00', 'America/Sao_Paulo').format('x');
  const endTime = moment.tz('2021-04-01T23:00:00', 'America/Sao_Paulo').format('x');
  const now = moment().tz('America/Sao_Paulo').format('x');

  if(now < startTime) {
    res.sendFile(path.join(__dirname, 'www', 'landing.html'));
  } else if(now < endTime) {
    res.sendFile(path.join(__dirname, 'www', 'manifao.html'));
  } else {
    res.sendFile(path.join(__dirname, 'www', 'logo.html'));
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
