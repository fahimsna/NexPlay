const express = require("express");

const router = express.Router();

const {
  createComment,
  getComments,
  toggleLikeComment,
  reportComment,
  getReportedComments,
  moderateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", createComment);

router.get("/reported", getReportedComments);

router.get("/content/:mediaType/:tmdbId", getComments);

router.patch("/:id/like", toggleLikeComment);

router.post("/:id/report", reportComment);

router.patch("/:id/moderate", moderateComment);

router.delete("/:id", deleteComment);

module.exports = router;