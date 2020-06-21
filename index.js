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
app.use(express.static(path.join(__dirname, 'www')));

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    data: { message: 'API OK' }
  });
});

//app.get('/app', function(req, res) {
//    res.sendFile(path.join(__dirname, 'www', 'app.html'));
//});

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
