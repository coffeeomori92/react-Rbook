exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); // 다음 미들웨어 실행
  } else {
    res.status(401).send('ログインが必要です。');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('先にログアウトしてください。');
  }
};