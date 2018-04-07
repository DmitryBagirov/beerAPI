const express = require('express');

const app = express();
const port = 9000;

process.on('uncaughtException', (err) => {
  console.log(err);
});

app.use(require('./routes'));

app.listen(port, () => console.log(`App started on port ${port}!`));
