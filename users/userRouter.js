const express = require('express');

const router = express.Router();
const idBody = [validateUserId];

// import user db
const User = require('./userDb.js');



router.post('/', async (req, res) => {
  try {
    const user = await User.insert(req.query);
    res.status(200).json(user);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

router.post('/:id/posts', idBody, async (req, res) => {
  try {
    const user = await User.getById(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await User.get(req.query);
    res.status(200).json(user);
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

router.get('/:id/posts', idBody, async (req, res) => {
  try {
    const messages = await User.getUserPosts(req.params.id);

    res.status(200).json(messages);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the hub',
    });
  }
});

router.delete('/:id', idBody, async (req, res) => {
  try {
    const count = await User.remove(req.params.id);
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
    const user = await User.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
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

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if (user) {
      req.hub = user; // in all of these routes we will have access to req.hub
    } else {
      // res.status(404).json({ message: 'Hub not found; invalid id'});
      next({ message: "Please include request body"});
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to process request'});
  }
};

async function validateUser(req, res, next) {
  
};

function validatePost(req, res, next) {

};

module.exports = router;
