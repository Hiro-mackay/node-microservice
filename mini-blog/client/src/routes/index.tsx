import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        簡易ブログサービスへようこそ
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        ブログ記事を投稿したり、コメントを残したりできます。
      </p>
      <div className="space-x-4">
        <Link
          to="/posts"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          記事一覧を見る
        </Link>
      </div>
    </div>
  );
}
