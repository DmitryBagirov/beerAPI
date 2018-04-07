const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

process.on('uncaughtException', (err) => {
  console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require('./routes'));

app.listen(port, () => console.log(`App started on port ${port}!`));
