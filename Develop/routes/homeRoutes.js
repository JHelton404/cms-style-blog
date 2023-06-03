const router = require('express').Router();
const { User, Comment, Blog } = require('../models');
const passwordVerify = require('../utils/auth')

router.get('/dashboard', passwordVerify, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'body'],
      order: [['id', 'DESC']]
    })

    const blog = blogData.map((data) => data.get({ plain: true }))

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      layout: 'dashboard'
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login')
})

router.get('*', async (req, res) => {
  try {
    blogData = await Blog.findAll({
      attributse: ['id', 'title', 'body'],
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        }
      ],
      order: [['id', 'DESC']]
    });

    const blog = blogData.map((post) => post.toJSON());

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
      layout: layout
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})