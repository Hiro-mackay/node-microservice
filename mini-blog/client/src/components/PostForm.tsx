import { useState } from "react";
import { useCreatePost } from "../hooks/usePosts";

export function PostForm() {
  const [title, setTitle] = useState("");
  const createPost = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createPost.mutateAsync({ title: title.trim() });
      setTitle("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          記事タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="記事のタイトルを入力してください"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={createPost.isPending}
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim() || createPost.isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {createPost.isPending ? "投稿中..." : "記事を投稿"}
      </button>
      {createPost.isError && (
        <p className="text-red-600 text-sm">
          投稿に失敗しました。もう一度お試しください。
        </p>
      )}
    </form>
  );
}
