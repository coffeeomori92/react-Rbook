const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Video, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// GET
// /user/
router.get('/', async (req, res, next) => {
  try {
    if(req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: ['id', 'nickname'],
        include: [{
          model: Post,
          attributes: ['id']
        }, {
          model: User,
          as: 'Subscriber',
          attributes: ['id']
        }, {
          model: User,
          as: 'Producer',
          attributes: ['id']
        }]
      });
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      return res.status(200).json(null);
    }
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.get('/subscriber', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if(!user) {
      res.status(403).send('存在しないユーザです。');
    }
    const subscribers = await user.getSubscriber({
      limit: parseInt(req.query.limit, 10),
      attributes: ['id', 'nickname']
    });
    res.status(200).json(subscribers);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.get('/producer', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if(!user) {
      res.status(403).send('存在しないユーザです。');
    }
    const producer = await user.getProducer({
      limit: parseInt(req.query.limit, 10),
      attributes: ['id', 'nickname']
    });
    res.status(200).json(producer);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.delete('/subscriber/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });
    if(!user) {
      res.status(403).send('存在しないユーザです。');
    }
    await user.removeSubscriber(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10 )});
  } catch(error) {
    console.error(error);
    next(error);
  }
});

// POST 
// /user/
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email }
    });
    if(exUser) {
      return res.status(403).send('登録済みのIDです。');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    });
    res.status(201).send('ok');
  } catch(error) {
    console.error(error);
    next(error); // status 500
  }
});

// /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if(error) {
      console.error(error);
      return next(error);
    }
    if(info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'nickname'],
        include: [{
          model: Post,
          attributes: ['id']
        }, {
          model: User,
          as: 'Subscriber',
          attributes: ['id']
        }, {
          model: User,
          as: 'Producer',
          attributes: ['id']
        }]
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// /user/logout
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).send('ok');
});

// PATCH 
// /user/nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname
    }, {
      where: { id: req.user.id }
    });
    res.status(201).json({ nickname: req.body.nickname });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Subscriber',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Producer',
        attributes: ['id'],
      }]
    })
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Subscriber = data.Subscriber.length;
      data.Producer = data.Producer.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('存在しないユーザです。');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } 
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Video,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']],
        }],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'SharedPost',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }, {
          model: Video,
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// /user/subscribe
router.patch('/:userId/subscribe', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });
    if(!user) {
      res.status(403).send('存在しないユーザです。');
    }
    await user.addSubscriber(req.user.id);
    res.status(201).json({ UserId: parseInt(req.params.userId, 10) });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

// DELETE 
// /user/subscribe
router.delete('/:userId/subscribe', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });
    if(!user) {
      res.status(403).send('存在しないユーザです。');
    }
    await user.removeSubscriber(req.user.id);
    res.status(201).json({ UserId: parseInt(req.params.userId, 10) });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;