const express = require('express');

const server = express();
const port = 8080;

server.get('/', (req, res) => {
  res.json({
    message: "API is working"
  })
})

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})