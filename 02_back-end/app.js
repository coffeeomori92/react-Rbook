const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');

const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('✅ Database is connected');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // 쿠키 전달
}));
app.use(express.json()); // JSON 형식 해석
app.use(express.urlencoded({ extended: true })); // form 형식 해석
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(8080, () => {
  console.log('🎉 Listening on http://localhost:3065');
});