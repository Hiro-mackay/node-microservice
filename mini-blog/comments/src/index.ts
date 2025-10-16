import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";

const EVENT_BUS_API_URL = "http://localhost:4005";

const comments = new Map<
  string,
  {
    postId: string;
    contents: { id: string; content: string; createdAt: Date }[];
  }
>();

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

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

  const prevComment = comments.get(postId) ?? { postId, contents: [] };

  const event = {
    type: "CommentCreated",
    data: {
      postId,
      content: {
        id,
        content,
        createdAt: new Date(),
      },
    },
  };

  comments.set(postId, {
    postId,
    contents: prevComment.contents.concat(event.data.content),
  });

  await fetch(`${EVENT_BUS_API_URL}/events`, {
    method: "POST",
    body: JSON.stringify(event),
  });

  return c.json(
    {
      commentId: id,
    },
    201
  );
});

app.post("/events", async (c) => {
  const { type, data } = await c.req.json();
  console.info("Received event:", type, data);

  return c.json({}, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4001,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
