import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

type Event = {
  type: string;
  data: object;
};

const events: Event[] = [];

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

const POSTS_API_URL = process.env.POSTS_API_URL;
const COMMENTS_API_URL = process.env.COMMENTS_API_URL;
const QUERY_API_URL = process.env.QUERY_API_URL;
const MODERATION_API_URL = process.env.MODERATION_API_URL;

async function sendEventToService(url: string, body: any) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

app.post("/events", async (c) => {
  const body = await c.req.json();

  events.push(body);

  Promise.allSettled([
    sendEventToService(`${POSTS_API_URL}/events`, body),
    sendEventToService(`${COMMENTS_API_URL}/events`, body),
    sendEventToService(`${QUERY_API_URL}/events`, body),
    sendEventToService(`${MODERATION_API_URL}/events`, body),
  ]).then((results) => {
    const rejectedResults = results.filter(
      (result) => result.status === "rejected"
    );
    if (rejectedResults.length > 0) {
      console.error(
        "Error sending event to services:",
        rejectedResults.map((result) => result.reason)
      );
    } else {
      console.info("Event sent to all services successfully");
    }
  });

  return c.json({}, 200);
});

app.get("/events", (c) => {
  return c.json({ events }, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
