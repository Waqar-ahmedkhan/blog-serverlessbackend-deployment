import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { BlogRouter } from "./routes/BlogRouter";
import { UserRouter } from "./routes/UserRouter";


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();
app.use('/*', cors())

app.route("/api/v1/user", UserRouter)
app.route("/api/v1/blog", BlogRouter)





export default app;
