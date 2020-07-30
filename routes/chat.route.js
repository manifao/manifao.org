const express = require('express');

const Message = require('../models/message.model');

module.exports = (app, io) => {
  const router = express.Router();
  app.use('/chat', router);

  router.get('/', (req, res) => {
    res.status(200).send({
      success: true,
      data: '/chat OK'
    });
  });

  router.post('/', (req, res) => {
    const mMessage = new Message(req.body);
    io.emit('message', req.body);
    io.emit('counter', { count: io.engine.clientsCount });

    res.status(200).send({
      success: true,
      data: { message: mMessage }
    });
  });
};
