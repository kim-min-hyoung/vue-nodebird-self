const Sequelize = require("sequelize");
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Image = require("./image");
const Hashtag = require("./hashtag");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Image = Image;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Image.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Image.associate(db);
Hashtag.associate(db);

module.exports = db;
