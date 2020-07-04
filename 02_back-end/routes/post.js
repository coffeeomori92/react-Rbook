const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploaded_images');
} catch(error) {
  fs.mkdirSync('uploaded_images');
  console.log('uploaded_images is created');
}

try {
  fs.accessSync('uploaded_videos');
} catch(error) {
  fs.mkdirSync('uploaded_videos');
  console.log('uploaded_videos is created');
}

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

module.exports = router;