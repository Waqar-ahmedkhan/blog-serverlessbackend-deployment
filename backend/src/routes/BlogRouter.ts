import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput, } from "@vickikhan/common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


BlogRouter.use("/*", async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    if (!decoded) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set('userId', decoded.id);
    await next();
  } catch (e: any) {
    console.log(`JWT verification error: ${e.message}`);
    c.status(401);
    return c.json({ error: "invalid JWT token", details: e.message, text: "error in middleware" });
  }
});


BlogRouter.post('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = createPostInput.safeParse(body);
  

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userId,
      },
    });
    return c.json({ id: blog.id });
  } catch (e: any) {
    c.status(400);
    console.log("Error creating post:", e);
    return c.json({ error: e.message });
  }
});


BlogRouter.put('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success } = updatePostInput.safeParse(body)
  if (!success){
    c.status(411);
    return  c.json({ error: 'inputs not  valid' });
  }

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,  
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  } catch (e: any) {
    c.status(400);
    console.log("Error updating post:", e);
    return c.json({ error: e.message });
  }
});
BlogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({ posts });
  } catch (e: any) {
    c.status(400);
    console.log("Error fetching posts:", e);
    return c.json({ error: e.message });
  }
});

BlogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    if (blog) {
      return c.json(blog);
    } else {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }
  } catch (e: any) {
    c.status(400);
    console.log("Error fetching post:", e);
    return c.json({ error: e.message });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma Client is closed properly
  }
});




