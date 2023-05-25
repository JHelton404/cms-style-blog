const router = require('express').Router();

router.get('/', async (req, res) => {
  // res.render('homepage')
  res.send('homepage')
})

router.get('/main', (req, res) => {
  res.render('main')
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

module.exports = router;