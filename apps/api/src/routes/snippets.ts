import { Hono } from 'hono';
import { authMiddleware, type AuthVariables } from '../middleware/auth';
import { db } from '../lib/db';

export const snippetRoutes = new Hono<{ Variables: AuthVariables }>()
  .use('*', authMiddleware)
  .get('/', async (c) => {
    // TODO: fetch snippets for c.get("userId")
    return c.json({ message: 'list snippets — not yet implemented' }, 501);
  })
  .post('/', async (c) => {
    const body = await c.req.json();
    // TODO: create snippet for c.get("userId")
    return c.json({ message: 'create snippet — not yet implemented' }, 501);
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param();
    // TODO: fetch single snippet
    return c.json({ message: 'get snippet — not yet implemented' }, 501);
  })
  .patch('/:id', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json();
    // TODO: update snippet (verify ownership)
    return c.json({ message: 'update snippet — not yet implemented' }, 501);
  })
  .delete('/:id', async (c) => {
    const { id } = c.req.param();
    // TODO: delete snippet (verify ownership)
    return c.json({ message: 'delete snippet — not yet implemented' }, 501);
  });
