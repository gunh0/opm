const { Router } = require("express");
const router = Router()
const board = require("./board");

router.get("/api/allarticles", board.getAllArticles);

module.exports = router;
