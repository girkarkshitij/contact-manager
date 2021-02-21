const express = require('express');
const router = express.Router();

// @route    POST api/users
// @desc     Add a user
// @access   Public
router.post('/', (req, res) => {
  res.send('User added 👍');
});

module.exports = router;
