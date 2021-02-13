const router = require('express').Router();
const {
  updateButtonState,
  getButtonState,
} = require('../controllers/button');

router.get('/button', getButtonState);
router.patch('/button', updateButtonState);

module.exports = router;
