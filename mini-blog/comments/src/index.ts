import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";

const EVENT_BUS_API_URL = process.env.EVENT_BUS_API_URL;

/**
 * Models
 */

type Status = "pending" | "approved" | "rejected";

type BaseCooment = {
  id: string;
  content: string;
  postId: string;
  createdAt: Date;
  status: Extract<Status, "pending">;
};

type CreatedComment = BaseCooment & {
  status: Extract<Status, "pending">;
};

type ModeratedComment = BaseCooment & {
  status: Exclude<Status, "pending">;
};

type Comment = CreatedComment | ModeratedComment;

const comments = new Map<string, Comment>();

/**
 * Events
 */
const CommentCreatedEventName = "CommentCreated" as const;
const CommentUpdatedEventName = "CommentUpdated" as const;
const CommentModeratedEventName = "CommentModerated" as const;

type CommentCreatedEvent = {
  type: typeof CommentCreatedEventName;
  data: CreatedComment;
};

type CommentUpdatedEvent = {
  type: typeof CommentUpdatedEventName;
  data: Comment;
};

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

function getCommentsByPostId(postId: string): Comment[] {
  return Array.from(comments.values()).filter(
    (comment) => comment.postId === postId
  );
}

app.get("/posts/:postId/comments", (c) => {
  const { postId } = c.req.param();

  const postComments = getCommentsByPostId(postId);

  return c.json({
    postId,
    comments: postComments,
  });
});

app.post("/posts/:postId/comments", async (c) => {
  const id = nanoid();
  const { content } = await c.req.json();
  const { postId } = c.req.param();

  if (content === undefined || content.trim() === "") {
    return c.json({ error: "Content is required" }, 400);
  }

  const event: CommentCreatedEvent = {
    type: CommentCreatedEventName,
    data: {
      id,
      content,
      postId,
      createdAt: new Date(),
      status: "pending",
    },
  };

  comments.set(id, event.data);

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

  switch (type) {
    case CommentModeratedEventName:
      comments.set(data.id, data);

      const event: CommentUpdatedEvent = {
        type: CommentUpdatedEventName,
        data: data,
      };

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
    port: 3000,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
