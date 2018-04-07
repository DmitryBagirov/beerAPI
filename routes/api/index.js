const router = require('express').Router();

router.use('/beer', require('./beer'));

module.exports = router;
