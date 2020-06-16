require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    data: 'Hello'
  });
})

var server = http.listen(PORT, () => {
  console.log('server is running on port', server.address().port);
});
