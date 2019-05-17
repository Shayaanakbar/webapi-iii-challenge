// import Express
const express = require('express');

const server = express();

// ROUTES
const userRoutes = require('./users/userRouter.js');
const postRoutes = require('./posts/postRouter.js');


//built in Middleware
server.use(express.json());


// use routes
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
server.use(logger);
//- `validateUserId()`
// - `validateUser()`
// - `validatePost()`


function logger(req, res, next) {
  console.log (`${req.method} Request`);
  next();
};


// GLOBAL CATCH ALL
server.use((err, req, res, next) => {
  res.status(500).json({
    message: 'bad dog',
    err
  })
});

module.exports = server;
