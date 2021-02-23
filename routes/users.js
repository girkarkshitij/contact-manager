const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route    POST api/users
// @desc     Add a user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password should contain minimum 8 characters').isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    res.send('Passed ✔️');
  }
);

module.exports = router;
