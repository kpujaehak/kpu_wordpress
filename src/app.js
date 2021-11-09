const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('KPU: Hello world!!');
});

app.get('/users', (req, res) => {
  const Client = require('pg').Client;

  const client = new Client({
    host: process.env.EXPRESS_DB_HOST || 'localhost',
    port: process.env.EXPRESS_DB_PORT || '5432',
    database: process.env.EXPRESS_DB_NAME || 'kpu_db',
    user: process.env.EXPRESS_DB_USER || 'kpu',
    password: process.env.EXPRESS_DB_PASSWORD || 'kpu1234',
  });

  client.connect((err) => {
    if(err) throw err;

    client.query('SELECT * FROM users', (err, result) => {
      if(err) throw err;

      return res.send(result);

      client.end((err) => {
        if(err) throw err;
      });
    });
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
