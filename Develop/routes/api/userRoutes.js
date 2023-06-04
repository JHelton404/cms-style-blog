const router = require('express').Router();
const User = require('../../models/User');
const passwordVerify = require('../../utils/auth');
const loggedIn = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const resp = await User.findAll();
    res.status(200).json({ status: "success", payload: resp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get("/:id", async (req, res) => {
  try {
    const resp = await User.findByPk(req.params.id);
    res.json({ status: "success", payload: resp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await User.create(req.body);
    res.json({ status: "success", payload: post});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const update = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success", payload: update });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletion = await User.destroy({ 
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success", payload: deletion});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email }});
    if (!user) {
      return res.status(401).json({ error: 'Email Address not found' })
    }

    const isMatch = await passwordVerify(req.body.password, user.password);

    if (isMatch) {
      res.status(200).json({ status: 'success', token: 'your_pass' });
    } else {
      res.status(401).json({ error: 'Invalid Password'});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
    res.status(204).end();
  } else {
    res.status(404).end();
  }
})

module.exports = router;