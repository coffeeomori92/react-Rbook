const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');

const db = require('./models');

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

app.get('/', (req, res) => {
  res.send('hello node!');
});

app.listen(3065, () => {
  console.log('🎉 Listening on http://localhost:3065');
});