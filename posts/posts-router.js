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
        error: "The posts information could not be retrieved.",
      });
    })
})

router.get(`/api/posts/:id`, (req, res) => {
  posts.findById(req.params.id)
    .then((post) => {
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    })
})
router.get(`/api/posts/:id/comments`, (req, res) => {
  posts.findPostComments(req.params.id)
    .then((comments) => {
      if (comments[0]) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    })
})
router.post(`/api/posts`, (req, res) => {
  posts.findById(req.params.id)
    .then(() => {

    })
    .catch((err) => {

    })
})
router.post(`/api/posts/:id/comments`, (req, res) => {
  posts.findById(req.params.id)
    .then(() => {

    })
    .catch((err) => {

    })
})
router.put(`/api/posts/:id`, (req, res) => {
  posts.findById(req.params.id)
    .then(() => {

    })
    .catch((err) => {

    })
})
router.delete(`/api/posts/:id`, (req, res) => {
  posts.findById(req.params.id)
    .then(() => {

    })
    .catch((err) => {

    })
})

module.exports = router;