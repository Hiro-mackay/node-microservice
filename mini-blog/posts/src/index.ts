import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";

const EVENT_BUS_API_URL = "http://localhost:4005";

/**
 * Models
 */
type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

const posts = new Map<string, Post>();

/**
 * Events
 */
const PostCreatedEventName = "PostCreated" as const;

type PostCreatedEvent = {
  type: typeof PostCreatedEventName;
  data: Post;
};

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

app.get("/posts", (c) => {
  return c.json({
    posts: Array.from(posts.values()),
  });
});

app.post("/posts", async (c) => {
  const id = nanoid();
  const { title, content } = await c.req.json();

  if (title === undefined || title.trim() === "") {
    return c.json({ error: "Title is required" }, 400);
  }

  if (content === undefined || content.trim() === "") {
    return c.json({ error: "Content is required" }, 400);
  }

  const event: PostCreatedEvent = {
    type: PostCreatedEventName,
    data: {
      id,
      title,
      content,
      createdAt: new Date(),
    },
  };

  posts.set(id, event.data);

  await fetch(`${EVENT_BUS_API_URL}/events`, {
    method: "POST",
    body: JSON.stringify(event),
  });

  return c.json(
    {
      postId: id,
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
    port: 4000,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
