module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    src: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  Video.associate = db => {
    db.Video.belongsTo(db.Post);
  };
  return Video;
}