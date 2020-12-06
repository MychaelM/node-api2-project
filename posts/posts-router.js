const express = require('express');
const posts = require('../data/db');

const router = express.Router();

router.get(`/api/posts`, (req, res) => {
  posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retreiving posts"
      })
    })
})

module.exports = router;