const express = require('express');

// import post DB
const Post = require('./postDb.js');


const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const post = await Post.find(req.query);
    res.status(200).json(post);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

router.get('/:id', async (req, res) => {
  res.status(200).json(req.hub);
});

router.delete('/:id', (req, res) => {
  try {
    const count = await Post.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;