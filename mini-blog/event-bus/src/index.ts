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

const POSTS_API_URL = "http://localhost:4000";
const COMMENTS_API_URL = "http://localhost:4001";
const QUERY_API_URL = "http://localhost:4002";
const MODERATION_API_URL = "http://localhost:4003";

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
    port: 4005,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
