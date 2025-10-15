import { useState } from "react";
import { useCreatePost } from "../hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          新しい記事を投稿
        </CardTitle>
        <CardDescription>
          ブログに新しい記事を投稿して、読者と知識を共有しましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              記事タイトル
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="魅力的なタイトルを入力してください..."
              disabled={createPost.isPending}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button
            type="submit"
            disabled={!title.trim() || createPost.isPending}
            className="w-full transition-all duration-200 hover:scale-[1.02]"
            size="lg"
          >
            {createPost.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                投稿中...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                記事を投稿
              </>
            )}
          </Button>
          {createPost.isError && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
              投稿に失敗しました。もう一度お試しください。
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
