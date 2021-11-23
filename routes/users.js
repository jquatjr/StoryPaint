/** Routes for users of pg-intro-demo. */

const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async function (req, res, next) {
  try {
    const user = await User.findAll();

    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.get(username);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.register(username, password);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    const user = await User.authenticate(username, password);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

// router.patch("/:username", async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const { password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const results = await db.query(
//       "UPDATE users SET username=$1, password=$2 WHERE username=$3 RETURNING username",
//       [username, hashedPassword]
//     );
//     if (results.rows.length === 0) {
//       throw new ExpressError(`Can't update user with username of ${username}`, 404);
//     }
//     return res.send({ user: results.rows[0] });
//   } catch (e) {
//     return next(e);
//   }
// });

router.delete("/:username", async (req, res, next) => {
  try {
    User.remove(req.params.username);
    return res.send({ msg: "DELETED!" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
