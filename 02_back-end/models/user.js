const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id가 기본적으로 들어있음
    email: {
      // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    charset: 'utf8', // 한글 저장
    collate: 'utf8_general_ci'
  });
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Subscribe', as: 'Subscriber', foreignKey: 'ProducerId'});
    db.User.belongsToMany(db.User, { through: 'Subscribe', as: 'Producer', foreignKey: 'SubscriberId'});
  };
  return User;
};