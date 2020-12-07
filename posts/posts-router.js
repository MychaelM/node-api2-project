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
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    })
})
router.post(`/api/posts/:id/comments`, (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }
  posts.findById(req.params.id)
    .then((post) => {
      // console.log(post)
      if (!post[0]) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })

  posts.insertComment(req.body)
    .then((comment) => {
      // console.log(comment)
      res.status(201).json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    })
})
router.put(`/api/posts/:id`, (req, res) => {
  posts.findById(req.params.id)
    .then((post) => {
      if (post[0]) {
        console.log(post);
        if (!req.body.title || !req.body.contents) {
          return res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
          });
        }
        posts.update(req.params.id, req.body)
          .then((updatedPost) => {
            res.status(200).json(req.body)
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: "The post information could not be modified.",
            });
          })
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }

    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: "The post information could not be modified.",
      });
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