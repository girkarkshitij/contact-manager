const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

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
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'This email is already in use' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User added 👨');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
