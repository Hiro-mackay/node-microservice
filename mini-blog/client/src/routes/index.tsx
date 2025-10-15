import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileText,
  MessageCircle,
  Users,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="space-y-16">
      {/* ヒーローセクション */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Sparkles className="h-3 w-3 mr-1" />
            モダンなブログプラットフォーム
          </Badge>
        </div>
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          あなたのアイデアを
          <br />
          世界と共有しよう
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          美しく、直感的で、パワフルなブログプラットフォームで、あなたのストーリーを語り、読者とのつながりを深めましょう。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="group">
            <Link to="/posts">
              記事を読む
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/posts">記事を投稿する</Link>
          </Button>
        </div>
      </div>

      {/* 機能紹介セクション */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">簡単投稿</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              直感的なエディターで、あなたのアイデアを素早く記事に変換できます。マークダウン対応で、リッチなコンテンツを作成しましょう。
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">活発な議論</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              読者との双方向コミュニケーションを促進。コメント機能で、深い議論と知識の共有を実現します。
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">コミュニティ</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              同じ興味を持つ人々とつながり、知識を共有し、新しい視点を発見しましょう。あなたのコミュニティを築いてください。
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* CTA セクション */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">今すぐ始めましょう</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            あなたの最初の記事を投稿して、ブログの旅を始めませんか？
          </p>
          <Button asChild size="lg" className="group">
            <Link to="/posts">
              記事を投稿する
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
