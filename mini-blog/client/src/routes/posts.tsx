import { createFileRoute } from "@tanstack/react-router";
import { PostsList } from "../components/PostsList";
import { PostForm } from "../components/PostForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, PenTool } from "lucide-react";

export const Route = createFileRoute("/posts")({
  component: Posts,
});

function Posts() {
  return (
    <div className="space-y-12">
      {/* ページヘッダー */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          ブログ記事
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          新しい記事を投稿したり、既存の記事にコメントを残したりして、コミュニティと知識を共有しましょう。
        </p>
      </div>

      {/* 記事投稿セクション */}
      <div className="max-w-2xl mx-auto">
        <PostForm />
      </div>

      <Separator className="max-w-2xl mx-auto" />

      {/* 記事一覧セクション */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
            <PenTool className="h-5 w-5" />
            記事一覧
          </h2>
          <p className="text-muted-foreground mt-2">
            コミュニティの最新記事をチェックしましょう
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <PostsList />
        </div>
      </div>
    </div>
  );
}
