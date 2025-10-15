import { usePosts } from "../hooks/usePosts";
import { PostItem } from "./PostItem";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, FileText, Loader2 } from "lucide-react";

export function PostsList() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-4">
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="space-y-1">
              <h3 className="font-semibold text-destructive">読み込みエラー</h3>
              <p className="text-sm text-muted-foreground">
                記事の読み込みに失敗しました。ページを再読み込みしてお試しください。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.posts || data.posts.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
            <div className="space-y-1">
              <h3 className="font-semibold">まだ記事がありません</h3>
              <p className="text-sm text-muted-foreground">
                最初の記事を投稿して、ブログを始めてみましょう！
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {data.posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
