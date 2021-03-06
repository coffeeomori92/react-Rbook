const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');

const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('✅ Database is connected');
  })
  .catch((error) => {
    console.error(error);
  });
passportConfig();

if(process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(cors({
    origin: 'https://reactrbook.com',
    credentials: true
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true
  }));
}

app.use(express.static(path.join(__dirname, 'uploaded_images')));
app.use(express.static(path.join(__dirname, 'uploaded_videos')));
app.use(express.json()); // JSON 형식 해석
app.use(express.urlencoded({ extended: true })); // form 형식 해석
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  proxy: process.env.NODE_ENV === 'production' ? true : false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    domain: process.env.NODE_ENV === 'production' && '.reactrbook.com'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

app.listen(8080, () => {
  console.log('🎉 Listening on http://localhost:8080');
});