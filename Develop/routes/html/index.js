const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/blog', blogRoutes)
router.use('/', homeRoutes);

module.exports = router