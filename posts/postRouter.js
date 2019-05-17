const express = require('express');

// import post DB
const Post = require('./postDb.js');
const idBody = [validatePostId];



const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const post = await Post.insert(req.query);
    res.status(200).json(post);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

router.get('/:id', idBody, async (req, res) => {
  res.status(200).json(req.hub);
});

router.delete('/:id', idBody, async (req, res) => {
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

router.put('/:id', idBody, async (req, res) => {
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

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.getById(id);
    if (post) {
      req.hub = post; // in all of these routes we will have access to req.hub
    } else {
      // res.status(404).json({ message: 'Hub not found; invalid id'});
      next({ message: "Please include request body"});
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to process request'});
  }
};

module.exports = router;