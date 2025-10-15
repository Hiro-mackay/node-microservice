import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => {
    const [client] = useState(() => queryClient);

    return (
      <QueryClientProvider client={client}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-gray-900">
                  簡易ブログ
                </Link>
                <div className="space-x-4">
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    activeProps={{ className: "text-blue-600 font-medium" }}
                  >
                    ホーム
                  </Link>
                  <Link
                    to="/posts"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    activeProps={{ className: "text-blue-600 font-medium" }}
                  >
                    記事一覧
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  },
});
