import { usePosts } from "../hooks/usePosts";
import { PostItem } from "./PostItem";

export function PostsList() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">記事の読み込みに失敗しました。</p>
      </div>
    );
  }

  if (!data?.posts || data.posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          まだ記事がありません。最初の記事を投稿してみましょう！
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
