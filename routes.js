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

}));

module.exports = router;