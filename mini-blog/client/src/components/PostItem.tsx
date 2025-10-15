import { useState } from "react";
import { useComments, useCreateComment } from "../hooks/useComments";
import type { Post } from "../types/api";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { data: commentsData, isLoading: commentsLoading } = useComments(
    post.id
  );
  const createComment = useCreateComment(post.id);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      await createComment.mutateAsync({ content: commentContent.trim() });
      setCommentContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500">
          投稿日時: {formatDate(post.createdAt)}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          {showComments ? "コメントを隠す" : "コメントを見る"}
          {commentsData?.comments && commentsData.comments.length > 0 && (
            <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {commentsData.comments.length}
            </span>
          )}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="mb-4">
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor={`comment-${post.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  コメントを投稿
                </label>
                <textarea
                  id={`comment-${post.id}`}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="コメントを入力してください"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  disabled={createComment.isPending}
                />
              </div>
              <button
                type="submit"
                disabled={!commentContent.trim() || createComment.isPending}
                className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {createComment.isPending ? "投稿中..." : "コメント投稿"}
              </button>
              {createComment.isError && (
                <p className="text-red-600 text-sm">
                  コメントの投稿に失敗しました。
                </p>
              )}
            </form>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">コメント</h4>
            {commentsLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : commentsData?.comments && commentsData.comments.length > 0 ? (
              commentsData.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-md p-3">
                  <p className="text-gray-900 mb-1">{comment.content}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                まだコメントがありません。
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
