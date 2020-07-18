const express = require('express');
const { Op } = require('sequelize');

const { User, Hashtag, Image, Post, Video } = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    const where = {};
    if(parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt ]: parseInt(req.query.lastId, 10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.tag) }
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: Video
      }, {
        model: User,
        through: 'Like',
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
    res.json(posts);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;