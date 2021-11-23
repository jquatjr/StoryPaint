const express = require("express");
const router = express.Router();

const Coloring = require("../models/coloring");

router.get("/", async function (req, res, next) {
  try {
    const coloring = await Coloring.findAll();

    return res.json(coloring);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, image, user_id } = req.body;
    const coloring = await Coloring.create(name, image, user_id);

    return res.json(coloring);
  } catch (e) {
    return next(e);
  }
});

router.post("/testing", async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (e) {
    return next(e);
  }
});

router.get("/:user_id", async (req, res, next) => {
  try {
    const colorings = await Coloring.getAll(req.params.user_id);
    return res.json(colorings);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Coloring.remove(req.params.id);
    return res.send({ msg: "DELETED!" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
