import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signinInput, signupInput } from '@vickikhan/common';
import { Hono } from "hono";
import { sign } from 'hono/jwt';



export const UserRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();



UserRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      
      const body = await c.req.json();
      const { success } = signupInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({ error: 'inputs not  valid' });
      }

  
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password:body.password,
          name: body.name
        
        },
      });
  
      const jwtSecret = c.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }
  
      const jwt = await sign({ id: user.id }, jwtSecret);
      return c.json({jwt});
    } catch (e: any) {
      c.status(403);
      return c.json({ error: 'Error while signing up', details: e.message });
    }
  });
  
  // Login route
UserRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    try {
      const body = await c.req.json();
      const {success} = signinInput.safeParse(body);
      if (!success) {
        c.status(411);
        return c.json({ error: 'inputs not  valid' });
      }
  
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
  
      if (!user || user.password !== body.password) {
        c.status(403);
        return c.json({ error: 'Invalid email or password' });
      }
  
      const jwtSecret = c.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }
  
      const jwt = await sign({ id: user.id }, jwtSecret);
  
      return c.json({ user, token: jwt });
    } catch (e: any) {
      c.status(403);
      return c.json({ error: 'Error while logging in', details: e.message });
    }
  });