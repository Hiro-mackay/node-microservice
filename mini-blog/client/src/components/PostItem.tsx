import { useState } from "react";
import { useComments, useCreateComment } from "../hooks/useComments";
import type { Post } from "../types/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Send, Loader2, Calendar, User } from "lucide-react";

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

  const getInitials = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {getInitials(post.title)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg leading-tight">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.createdAt)}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="transition-all duration-200 hover:scale-105"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {showComments ? "コメントを隠す" : "コメントを見る"}
            {commentsData?.comments && commentsData.comments.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {commentsData.comments.length}
              </Badge>
            )}
          </Button>
        </div>

        {showComments && (
          <div className="mt-6 space-y-6">
            <Separator />

            {/* コメント投稿フォーム */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">コメントを投稿</h4>
              </div>
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <Textarea
                  id={`comment-${post.id}`}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="あなたのコメントを入力してください..."
                  rows={3}
                  disabled={createComment.isPending}
                  className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  type="submit"
                  disabled={!commentContent.trim() || createComment.isPending}
                  size="sm"
                  className="transition-all duration-200 hover:scale-105"
                >
                  {createComment.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      投稿中...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      コメント投稿
                    </>
                  )}
                </Button>
                {createComment.isError && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
                    コメントの投稿に失敗しました。
                  </div>
                )}
              </form>
            </div>

            <Separator />

            {/* コメント一覧 */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                コメント
              </h4>
              {commentsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : commentsData?.comments && commentsData.comments.length > 0 ? (
                <div className="space-y-4">
                  {commentsData.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm leading-relaxed">
                          {comment.content}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">まだコメントがありません。</p>
                  <p className="text-xs">
                    最初のコメントを投稿してみませんか？
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
