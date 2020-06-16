require('dotenv').config();

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const logger = require('./utils/logger');

const chat = require('./routes/chat.route');

const PORT = process.env.PORT || 3330;
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  logger.info('Connected to database...');
});

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json({ limit: '5mb' }));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'www')));

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    data: { message: 'API OK' }
  });
});

chat(app);

const server = app.listen(PORT, () => {
  logger.info(`Listening @ ${PORT}`);
});

module.exports = server;
