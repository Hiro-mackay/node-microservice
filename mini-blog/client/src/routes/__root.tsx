import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, FileText, PenTool } from "lucide-react";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: function RootRoute() {
    const [client] = useState(() => queryClient);

    return (
      <QueryClientProvider client={client}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          {/* ナビゲーションバー */}
          <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-200">
                    <PenTool className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    ブログプラットフォーム
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2"
                      activeProps={{
                        className: "bg-accent text-accent-foreground",
                      }}
                    >
                      <Home className="h-4 w-4" />
                      ホーム
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      to="/posts"
                      className="flex items-center gap-2"
                      activeProps={{
                        className: "bg-accent text-accent-foreground",
                      }}
                    >
                      <FileText className="h-4 w-4" />
                      記事一覧
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          {/* メインコンテンツ */}
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Outlet />
          </main>

          {/* フッター */}
          <footer className="border-t bg-background/50 mt-16">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">ブログプラットフォーム</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  モダンで美しいブログプラットフォームで、あなたのアイデアを世界と共有しましょう。
                </p>
                <Separator className="w-32" />
                <p className="text-xs text-muted-foreground">
                  © 2024 ブログプラットフォーム. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  },
});
