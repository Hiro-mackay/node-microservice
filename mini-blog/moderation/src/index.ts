import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const EVENT_BUS_API_URL = "http://localhost:4005";

type ModeratedComment = {
  id: string;
  postId: string;
  content: string;
  status: "approved" | "rejected";
  createdAt: Date;
};

const CommentModeratedCommand = "CommentModerated" as const;
const CommentCreatedCommand = "CommentCreated" as const;

type CommentModeratedEvent = {
  type: typeof CommentModeratedCommand;
  data: ModeratedComment;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const app = new Hono();

app.use("*", cors());

const keywords = ["orange", "apple", "banana"];

app.post("/events", async (c) => {
  const { type, data } = await c.req.json();
  console.info("Received event:", type, data);

  switch (type) {
    case CommentCreatedCommand:
      const isIncludedKeyword = keywords.some((keyword) =>
        data.content.includes(keyword)
      );
      const status = isIncludedKeyword ? "rejected" : "approved";
      const event: CommentModeratedEvent = {
        type: CommentModeratedCommand,
        data: {
          ...data,
          status,
        },
      };

      // Simulate moderation process
      await sleep(5000);

      await fetch(`${EVENT_BUS_API_URL}/events`, {
        method: "POST",
        body: JSON.stringify(event),
      });
      break;
  }

  return c.json({}, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4003,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
