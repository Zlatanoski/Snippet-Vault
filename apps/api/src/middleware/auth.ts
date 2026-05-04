import { createMiddleware } from 'hono/factory';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'changeme',
);

export type AuthVariables = {
  userId: string;
};

export const authMiddleware = createMiddleware<{ Variables: AuthVariables }>(
  async (c, next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      // if the authorization header doesnt start with bearer then return since JWTs should be sent with bearer prefix
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.slice(7); //remove first 7 characters ( bearer) and a space

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      c.set('userId', payload.userId as string);
      await next();
    } catch {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }
  },
);
