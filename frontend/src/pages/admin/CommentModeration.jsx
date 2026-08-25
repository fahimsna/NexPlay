import { useEffect, useState } from "react";

import {
  deleteComment,
  getReportedComments,
  moderateComment,
} from "../../services/commentService";

// Discussion Moderation queue. Lists every comment that has at least
// one report so an administrator can restore, hide, or permanently
// remove it.
function CommentModeration() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    try {
      setLoading(true);
      const data = await getReportedComments();
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleModerate(id, status) {
    try {
      await moderateComment(id, status);
      loadComments();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Permanently delete this comment?")) {
      return;
    }

    try {
      await deleteComment(id);
      loadComments();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#17191D] text-white p-10">
      <h1 className="text-3xl font-bold">Discussion Moderation</h1>

      <p className="text-gray-400 mt-3 max-w-2xl">
        Comments that have been reported by users.
      </p>

      {loading ? (
        <p className="text-gray-500 mt-6">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 mt-6">No reported comments right now.</p>
      ) : (
        <div className="grid gap-5 mt-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-[#24272D] border border-white/10 rounded-2xl p-6 max-w-2xl"
            >
              <h2 className="text-[#D4A017] font-semibold text-lg">
                {comment.authorName}
              </h2>

              <p className="mt-2 text-gray-200">{comment.text}</p>

              <p className="mt-3 text-sm text-gray-300">
                <span className="font-semibold">Reports:</span>{" "}
                {comment.reports.length}
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-semibold">Status:</span>{" "}
                {comment.status}
              </p>

              <ul className="mt-2 pl-5 text-xs text-gray-500 list-disc">
                {comment.reports.map((report, index) => (
                  <li key={index}>
                    {report.reason || "No reason given"} —{" "}
                    {new Date(report.reportedAt).toLocaleString()}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-5">
                {comment.status !== "visible" && (
                  <button
                    type="button"
                    onClick={() => handleModerate(comment._id, "visible")}
                    className="px-4 py-2 rounded-lg bg-[#D4A017] text-[#17191D] font-semibold cursor-pointer hover:opacity-90"
                  >
                    Restore
                  </button>
                )}

                {comment.status !== "hidden" && (
                  <button
                    type="button"
                    onClick={() => handleModerate(comment._id, "hidden")}
                    className="px-4 py-2 rounded-lg bg-[#3A3F47] text-white font-semibold cursor-pointer hover:opacity-90"
                  >
                    Hide
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(comment._id)}
                  className="px-4 py-2 rounded-lg bg-[#1B1D22] border border-white/15 text-white font-semibold cursor-pointer hover:opacity-90"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentModeration;