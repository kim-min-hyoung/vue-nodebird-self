const express = require("express");
const Sequelize = require("sequelize");

const db = require("../models");
const Op = Sequelize.Op;

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  //GET /hashtag/:tag?lastId=10&limit=10
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }

    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
          ],
          order: [
            ["createdAt", "ASC"],
            ["updatedAt", "DESC"],
          ],
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      // offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
