import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";

const comments = new Map<
  string,
  {
    postId: string;
    contents: { id: string; content: string; createdAt: Date }[];
  }
>();

const app = new Hono();

app.use("*", cors());

app.get("/posts/:postId/comments", (c) => {
  const { postId } = c.req.param();
  const contents = comments.get(postId)?.contents ?? [];
  return c.json({
    postId,
    comments: contents,
  });
});

app.post("/posts/:postId/comments", async (c) => {
  const id = nanoid();
  const { content } = await c.req.json();
  const { postId } = c.req.param();

  if (content === undefined || content.trim() === "") {
    return c.json({ error: "Content is required" }, 400);
  }

  const now = new Date();

  const prevComment = comments.get(postId) ?? { postId, contents: [] };

  const newComment = {
    postId,
    contents: prevComment.contents.concat({ id, content, createdAt: now }),
  };

  comments.set(postId, newComment);

  return c.json(
    {
      status: "ok",
      commentId: id,
    },
    201
  );
});

serve(
  {
    fetch: app.fetch,
    port: 4001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
