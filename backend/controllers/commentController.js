const Comment = require("../models/Comment");

const AUTO_HIDE_REPORT_THRESHOLD = 5;

const createComment = async (req, res) => {
  try {
    const { tmdbId, mediaType, text, authorName, parentComment } = req.body;

    if (parentComment) {
      const parent = await Comment.findById(parentComment);

      if (!parent) {
        return res.status(404).json({
          message: "Cannot reply: parent comment not found",
        });
      }
    }

    const comment = await Comment.create({
      tmdbId,
      mediaType,
      text,
      authorName: authorName || "Guest",
      parentComment: parentComment || null,
    });

    res.status(201).json({
      message: "Comment posted successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { mediaType, tmdbId } = req.params;

    const comments = await Comment.find({
      mediaType,
      tmdbId: Number(tmdbId),
      status: { $ne: "removed" },
    }).sort({ createdAt: 1 });

    const topLevel = comments.filter((comment) => !comment.parentComment);

    const withReplies = topLevel.map((comment) => ({
      ...comment.toObject(),
      likeCount: comment.likedBy.length,
      replies: comments
        .filter(
          (reply) =>
            reply.parentComment &&
            reply.parentComment.toString() === comment._id.toString(),
        )
        .map((reply) => ({
          ...reply.toObject(),
          likeCount: reply.likedBy.length,
        })),
    }));

    withReplies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(withReplies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleLikeComment = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required to like a comment",
      });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const alreadyLiked = comment.likedBy.includes(userId);

    if (alreadyLiked) {
      comment.likedBy = comment.likedBy.filter((id) => id !== userId);
    } else {
      comment.likedBy.push(userId);
    }

    await comment.save();

    res.status(200).json({
      message: alreadyLiked ? "Like removed" : "Comment liked",
      likeCount: comment.likedBy.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const reportComment = async (req, res) => {
  try {
    const { reason, reportedBy } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.reports.push({
      reason: reason || "Not specified",
      reportedBy: reportedBy || "anonymous",
    });

    if (
      comment.reports.length >= AUTO_HIDE_REPORT_THRESHOLD &&
      comment.status === "visible"
    ) {
      comment.status = "hidden";
    }

    await comment.save();

    res.status(200).json({
      message: "Comment reported successfully",
      reportCount: comment.reports.length,
      status: comment.status,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getReportedComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      "reports.0": { $exists: true },
      status: { $ne: "removed" },
    }).sort({ updatedAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const moderateComment = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["visible", "hidden", "removed"].includes(status)) {
      return res.status(400).json({
        message: "status must be one of visible, hidden, removed",
      });
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json({
      message: "Comment moderated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    await Comment.deleteMany({ parentComment: req.params.id });

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
  toggleLikeComment,
  reportComment,
  getReportedComments,
  moderateComment,
  deleteComment,
};