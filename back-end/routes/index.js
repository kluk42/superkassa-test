const router = require('express').Router();
const buttonRoutes = require('./button');

router.use(buttonRoutes);

module.exports = router;
