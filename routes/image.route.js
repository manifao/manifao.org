const express = require('express');

const imageT = require('../models/image.model');

module.exports = (app, io) => {
  const router = express.Router();
  app.use('/image', router);

  router.get('/', (req, res) => {
    res.status(200).send({
      success: true,
      data: '/image OK'
    });
  });

  router.post('/', (req, res) => {
    const mImage = new imageT(req.body);
    io.emit('image', req.body);

    mImage.save().then((saved) => {
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
