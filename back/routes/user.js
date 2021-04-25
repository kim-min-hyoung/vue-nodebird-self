const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res, next) => {
  const user = req.user;
  res.json(user);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  //회원가입
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).json({
        errorCode: 1,
        message: "이미 회원입니다.",
      });
    }
    await db.User.create({
      userId: req.body.userId,
      password: hash,
      nickname: req.body.nickname,
    });
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        const fulluser = await db.User.findOne({
          where: { id: user.id },
          attributes: ["id", "userId", "nickname"],
          include: [
            {
              model: db.Post,
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"],
            },
          ],
        });
        return res.json(fulluser);
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      const fulluser = await db.User.findOne({
        where: { id: user.id },
        attributes: ["id", "userId", "nickname"],
        include: [
          {
            model: db.Post,
            attributes: ["id"],
          },
          {
            model: db.User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.json(fulluser);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send("로그아웃 되었습니다");
});

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id/follower", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.send(req.body.nickname); //?json이 아니네??
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.user.id },
    });
    const followings = await user.getFollowings({
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit || 3, 10),
      offset: parseInt(req.query.offset || 0, 10),
    });
    res.json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.user.id },
    });
    const followers = await user.getFollowers({
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit || 3, 10),
      offset: parseInt(req.query.offset || 0, 10),
    });
    res.json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router;

module.exports = router;
