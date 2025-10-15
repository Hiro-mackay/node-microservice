import { createFileRoute } from "@tanstack/react-router";
import { PostsList } from "../components/PostsList";
import { PostForm } from "../components/PostForm";

export const Route = createFileRoute("/posts")({
  component: Posts,
});

function Posts() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ブログ記事</h1>
        <p className="text-gray-600">
          新しい記事を投稿したり、既存の記事にコメントを残したりできます。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          新しい記事を投稿
        </h2>
        <PostForm />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">記事一覧</h2>
        <PostsList />
      </div>
    </div>
  );
}
