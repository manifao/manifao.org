const express = require('express');

const Message = require('../models/message.model');

module.exports = (app) => {
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

    mMessage.save().then((saved) => {
      res.status(200).send({
        success: true,
        data: { message: saved }
      });
    }).catch((err) => {
      res.status(500).send({
        success: false,
        data: `${err}`
      });
    });

  });
};
