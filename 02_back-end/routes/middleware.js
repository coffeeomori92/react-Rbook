exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); // 다음 미들웨어 실행
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그아웃을 해주세요!');
  }
};