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
  const user = await User.create(req.body);
  res.location('/').status(204).end();
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
  const newCourse = await Course.create(req.body);
  res.location(`/courses/${newCourse.id}`).status(204).end();
}));

// Updates corresponding course and returns 204 status code
router.put('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  await course.update(req.body);
  res.location(`/courses/${req.params.id}`).status(204).end();
}));

// Deletes the corresponding course and returns 204 status code
router.delete('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  await course.destroy();
  res.status(204).end();
}));

module.exports = router;