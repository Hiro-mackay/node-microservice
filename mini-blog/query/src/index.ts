import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const EVENT_BUS_API_URL = "http://localhost:4005";

const posts = new Map<
  string,
  {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    comments: { id: string; content: string; createdAt: Date }[];
  }
>();

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

app.get("/posts", async (c) => {
  return c.json({ posts: Array.from(posts.values()) }, 200);
});

app.post("/events", async (c) => {
  const { type, data } = await c.req.json();

  switch (type) {
    case "PostCreated":
      posts.set(data.id, {
        ...data,
        comments: [],
      });
      break;

    case "CommentCreated":
      const post = posts.get(data.postId);
      if (post) {
        post.comments = post.comments.concat(data.content);
      }
      break;

    default:
      console.info("Received unknown event:", type, data);
      return c.json({ error: "Unknown event" }, 400);
  }

  console.info("Received event:", type, data);

  return c.json({}, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4002,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
