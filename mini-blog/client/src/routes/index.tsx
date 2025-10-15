import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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
        <Button asChild variant={"default"}>
          <Link to="/posts">記事一覧を見る</Link>
        </Button>
      </div>
    </div>
  );
}
