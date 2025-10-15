import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";

const posts = new Map<string, { id: string; title: string; createdAt: Date }>();

const app = new Hono();

app.use("*", cors());

app.get("/posts", (c) => {
  return c.json({
    posts: Array.from(posts.values()),
  });
});

app.post("/posts", async (c) => {
  const id = nanoid();
  const { title } = await c.req.json();

  if (title === undefined || title.trim() === "") {
    return c.json({ error: "Title is required" }, 400);
  }

  const now = new Date();

  posts.set(id, { id, title, createdAt: now });

  return c.json(
    {
      status: "ok",
      postId: id,
    },
    201
  );
});

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
