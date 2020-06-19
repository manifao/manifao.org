require('dotenv').config();

const AWS = require('aws-sdk');
const fs = require('fs');

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET
});


fs.readFile('./test.mp3', (err, data) => {
  if (err) throw err;

  const params = {
    Body: data,
    Bucket: 'manifao',
    Key: 'manifao-mp3/file.mp3',
    ACL: 'public-read'
  };

  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      console.log(data);
      console.log(`https://${params.Bucket}.${process.env.DO_SPACES_ENDPOINT}/${params.Key}`);
    }
  });
});
