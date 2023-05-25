const router = require('express').Router();
const { User, Comment, Blog } = require('../models');
// const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  const blogData = await Blog.findAll({
    include: {
      model: User,
      attributes: ["name"]
    }
  });
    const blogs = blogData.map((blogData) => 
    blogData.get({ plain: true})
  );
  res.render('insert', { /* logged_in: req.session.logged_in */ blogs })
})

router.get('/main', (req, res) => {
  res.render('main')
})

router.get('/dashboard/new', async (req, res) => {
  res.render('newPost', {layout: dashboard})
})

router.get('/api/find', async (req, res) => {
  const userPosts = await Blog.findAll(
    {
      where: {
        user_id: 1
      },
    },
    {
      include: {
        model: User,
        attributes: ['name']
      }
    }
    )
    const posts = userPosts.map((userPost) => 
      userPost.get({ plain: true})
    );
   console.log(userPosts)
  res.json(posts)
});

module.exports = router;