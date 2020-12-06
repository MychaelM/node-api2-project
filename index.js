const express = require('express');
const postsRoutes = require('./posts/posts-router');

const server = express();
const port = 8080;

server.use(express.json());
server.use(postsRoutes);

server.get('/', (req, res) => {
  res.json({
    message: "API is working"
  })
})

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})