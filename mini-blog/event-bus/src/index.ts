import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

const POSTS_API_URL = "http://localhost:4000";
const COMMENTS_API_URL = "http://localhost:4001";
const QUERY_API_URL = "http://localhost:4002";

app.post("/events", async (c) => {
  const body = await c.req.json();

  await Promise.all([
    fetch(`${POSTS_API_URL}/events`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
    fetch(`${COMMENTS_API_URL}/events`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
    fetch(`${QUERY_API_URL}/events`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  ]);

  return c.json({}, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4005,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
