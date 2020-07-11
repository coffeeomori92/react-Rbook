const express = require('express');
const { Op } = require('sequelize');

const { Post, Comment, Image, Video, User} = require('../models');

const router = express.Router();

// GET 
// /posts
router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if(parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: Video
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']]
        }]
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id']
      }, {
        model: Post,
        as: 'SharedPost',
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }, {
          model: Image
        }, {
          model: Video
        }]
      }]
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;