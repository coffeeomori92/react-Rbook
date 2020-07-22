const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { isLoggedIn } = require('./middlewares');
const { Post, Hashtag, Video, Comment, Image, User } = require('../models');

const router = express.Router();

try {
  fs.accessSync('uploaded_images');
} catch(error) {
  fs.mkdirSync('uploaded_images');
  console.log('✅ uploaded_images is created');
}

try {
  fs.accessSync('uploaded_videos');
} catch(error) {
  fs.mkdirSync('uploaded_videos');
  console.log('✅ uploaded_videos is created');
}

const upload = multer();

const upload_image = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploaded_images');
    },
    filename(req, file, done) { // image.png
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext); // 이름 추출
      done(null, `${basename}_${new Date().getTime() + ext}`);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

const upload_video = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploaded_videos');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, `${basename}_${new Date().getTime() + ext}`);
    }
  }),
  limits: { fileSize: 150 * 1024 * 1024 } // 150MB
});

// TODO
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if(hashtags) {
      const result = await Promise.all(hashtags.map(v => Hashtag.findOrCreate({
        where: { content: v.slice(1).toLowerCase() }
      })));
      await post.addHashtags(result.map(v => v[0]));
    }
    if(req.body.image) {
      if(Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map(v => Image.create({ src: v })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImage(image);
      }
    }
    if(req.body.video) {
      const video = await Video.create({ src: req.body.video });
      await post.setVideo(video);
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: Video
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }]
    });
    res.status(201).json(fullPost);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload_image.single('image'), (req, res, next) => {
  console.log(req.file);
  res.json(req.file.filename);
  // res.json(req.files.map(v => v.location.replace(/\/original\//, '/thumb/')));
});

router.post('/video', isLoggedIn, upload_video.single('video'), (req, res, next) => {
  console.log(req.file);
  res.json(req.file.filename);
});

router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!post) {
      return res.status(400).send('存在しない投稿です。');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
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
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: Video
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }]
    });
    res.status(200).json(fullPost);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/share', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'SharedPost'
      }]
    });
    if(!post) {
      return res.status(403).send('存在しないPOSTです。');
    }
    if(req.user.id === post.UserId || (post.SharedPost && post.SharedPost.UserId === req.user.id)) {
      return res.status(403).send('自分のPOSTはShareできません。');
    }
    const shareTargetId = post.SharedPostId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        SharedPostId: shareTargetId
      }
    });
    if(exPost) {
      return res.status(403).send('既にShareしました。');
    }
    const share = await Post.create({
      UserId: req.user.id,
      SharedPostId: shareTargetId,
      content: 'shared'
    });
    const sharedPostwithPrevPost = await Post.findOne({
      where: { id: share.id },
      include: [{
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
      }, {
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
          attributes: ['id', 'nickname']
        }]
      }]
    });
    res.status(201).json(sharedPostwithPrevPost);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

// Comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!post) {
      return res.status(403).send('存在しないPOSTです。');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }]
    });
    res.status(201).json(fullComment);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

// LIKE
router.post('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!post) {
      return res.status(403).send('存在しないPOSTです。');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

// UNLIKE
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if(!post) {
      return res.status(403).send('存在しないPOSTです。');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId,
        UserId: req.user.id 
      }
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;