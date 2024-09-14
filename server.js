const express = require('express');
const app = express();

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
  console.info('Press CTRL+C to quit');
});
