import { useEffect, useState } from "react";
import { HiChatBubbleLeftRight, HiFlag, HiHeart, HiOutlineHeart } from "react-icons/hi2";

import {
  createComment,
  getComments,
  reportComment,
  toggleLikeComment,
} from "../../services/commentService";
import { getAnonymousId } from "../../utils/anonymousId";

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);

  const units = [
    { label: "y", secs: 31536000 },
    { label: "mo", secs: 2592000 },
    { label: "d", secs: 86400 },
    { label: "h", secs: 3600 },
    { label: "m", secs: 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.secs);

    if (value >= 1) {
      return `${value}${unit.label} ago`;
    }
  }

  return "just now";
}

function CommentRow({ comment, onLike, onReply, onReport, isReply }) {
  const userId = getAnonymousId();

  const liked = comment.likedBy?.includes(userId);

  return (
    <div
      className={`
        ${isReply ? "ml-8 mt-4" : "mt-6"}
        bg-[#17191D]
        border
        border-white/10
        rounded-2xl
        p-5
      `}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#D4A017]">
          {comment.authorName}
        </span>

        <span className="text-xs text-gray-500">
          {timeAgo(comment.createdAt)}
        </span>
      </div>

      <p className="mt-2 text-gray-200 leading-6">{comment.text}</p>

      <div className="flex items-center gap-5 mt-4 text-sm">
        <button
          type="button"
          onClick={() => onLike(comment._id)}
          className="
            flex
            items-center
            gap-1.5
            text-gray-400
            hover:text-[#D4A017]
            transition
            cursor-pointer
          "
        >
          {liked ? <HiHeart className="text-[#D4A017]" /> : <HiOutlineHeart />}
          {comment.likeCount ?? comment.likedBy?.length ?? 0}
        </button>

        {!isReply && (
          <button
            type="button"
            onClick={() => onReply(comment._id)}
            className="
              flex
              items-center
              gap-1.5
              text-gray-400
              hover:text-[#D4A017]
              transition
              cursor-pointer
            "
          >
            <HiChatBubbleLeftRight />
            Reply
          </button>
        )}

        <button
          type="button"
          onClick={() => onReport(comment._id)}
          className="
            flex
            items-center
            gap-1.5
            text-gray-400
            hover:text-red-400
            transition
            cursor-pointer
          "
        >
          <HiFlag />
          Report
        </button>
      </div>

      {comment.replies?.map((reply) => (
        <CommentRow
          key={reply._id}
          comment={reply}
          onLike={onLike}
          onReply={onReply}
          onReport={onReport}
          isReply
        />
      ))}
    </div>
  );
}

function DiscussionForum({ tmdbId, mediaType }) {
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [authorName, setAuthorName] = useState("");

  const [text, setText] = useState("");

  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tmdbId, mediaType]);

  async function loadComments() {
    try {
      setLoading(true);

      const data = await getComments(mediaType, tmdbId);

      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    try {
      await createComment({
        tmdbId,
        mediaType,
        authorName: authorName.trim() || "Guest",
        text: text.trim(),
        parentComment: replyingTo,
      });

      setText("");
      setReplyingTo(null);

      loadComments();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike(commentId) {
    try {
      await toggleLikeComment(commentId, getAnonymousId());

      loadComments();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReport(commentId) {
    const reason = window.prompt(
      "Why are you reporting this comment? (optional)",
    );

    if (reason === null) {
      return;
    }

    try {
      await reportComment(commentId, reason, getAnonymousId());

      window.alert("Thanks — our moderation team will review this comment.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="
        mt-12
        bg-[#24272D]
        border
        border-white/10
        rounded-3xl
        p-8
      "
    >
      <h2 className="text-3xl font-bold">Discussion</h2>

      <p className="text-gray-400 mt-3 leading-7">
        Share your thoughts, reply to other viewers, and help keep the
        conversation respectful — reported comments are reviewed by our
        moderators.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        {replyingTo && (
          <div className="flex items-center justify-between text-sm text-[#D4A017]">
            Replying to a comment
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        <input
          type="text"
          placeholder="Your name (optional)"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          className="
            px-5
            py-3
            rounded-xl
            bg-[#17191D]
            border
            border-white/10
            outline-none
            focus:border-[#D4A017]
          "
        />

        <textarea
          placeholder="Join the discussion..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          required
          className="
            px-5
            py-3
            rounded-xl
            bg-[#17191D]
            border
            border-white/10
            outline-none
            focus:border-[#D4A017]
            resize-none
          "
        />

        <button
          type="submit"
          className="
            self-end
            px-6
            py-2.5
            rounded-full
            bg-[#D4A017]
            text-[#17191D]
            font-semibold
            hover:scale-105
            transition
            cursor-pointer
          "
        >
          {replyingTo ? "Post Reply" : "Post Comment"}
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 mt-6">Loading discussion...</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <CommentRow
            key={comment._id}
            comment={comment}
            onLike={handleLike}
            onReply={setReplyingTo}
            onReport={handleReport}
          />
        ))
      ) : (
        <p className="text-gray-400 mt-6">
          No comments yet. Be the first to start the discussion.
        </p>
      )}
    </div>
  );
}

export default DiscussionForum;