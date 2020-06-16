const path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    data: 'Hello'
  });
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
