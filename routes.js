const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./middleware/asyncHandler');
const {User, Course} = require('./models');

// Returns currently authenticated user
router.get('/users', asyncHandler(async(req, res) => {
  
}));

// Alows creation of a new user and sets location
// header to "/", returning a 201 HTTP status
router.post('/users', asyncHandler(async (req, res) => {
  const user = req.body;
  const errors = [];

  // Validates firstName exists
  if (!user.firstName) {
    errors.push('Please provide a value for "firstName"');
  }

  // Validates lastName exists
  if (!user.lastName) {
    errors.push('Please provide a value for "lastName"');
  }

  // Validates emailAddress exists
  if (!user.emailAddress) {
    errors.push('Please provide a value for "emailAddress"');
  }

  // Validates password exists
  if (!user.password) {
    errors.push('Please provide a value for "password"');
  }

  // If any errors, set status to 400 and send error messages to client
  if (errors.length > 0) {
    // Return the validation errors to the client.
    res.status(400).json({errors});
  } else {
      // Creates new user, sets Location header, and sets status to 204
      const newUser = await User.create(req.body);
      res.location('/').status(204).end();
  }
}));

// Returns a list of all courses and their associated users
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: [
      {
        model: User,
        as: 'User'
      }
    ]
  });
  res.status(200).json(courses);
}));

// Returns a specific course and its associated user
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'User'
      }
    ]
  });
  res.status(200).json(course);
}));

// Creates new course, sets Location header to URI for
// newly created course, returns 201 status code
router.post('/courses', asyncHandler(async (req, res) => {
  const course = req.body;
  const errors = [];

  // Validates title exists
  if (!course.title) {
    errors.push('Please provide a value for "title"');
  }

  // Validates description exists
  if (!course.description) {
    errors.push('Please provide a value for "description"');
  }

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {
    const newCourse = await Course.create(req.body);
    res.location(`/courses/${newCourse.id}`).status(204).end();
  }
}));

// Updates corresponding course and returns 204 status code
router.put('/courses/:id', asyncHandler(async (req, res) => {
  const course = req.body;
  const errors = [];

  // Validates title exists
  if (!course.title) {
    errors.push('Please provide a value for "title"');
  }

  // Validates description exists
  if (!course.description) {
    errors.push('Please provide a value for "description"');
  }

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {
    const course = await Course.findByPk(req.params.id);
    await course.update(req.body);
    res.location(`/courses/${req.params.id}`).status(204).end();
  }
}));

// Deletes the corresponding course and returns 204 status code
router.delete('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  await course.destroy();
  res.status(204).end();
}));

module.exports = router;