import { Hono } from 'hono';
import { SignJWT } from 'jose';
import { compare, hash } from 'bcryptjs';
import { db } from '../lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@snippet-vault/db';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

//validate schema for the email // automatically return 400 if the validation fails
const registerSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'change');

export const authRoutes = new Hono()
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { email, username, password } = c.req.valid('json');
    const hashedPassword = await hash(password, 10);

    // checks if the email is already in use
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existing.length > 0) {
      return c.json({ error: 'Email already in use' }, 409);
    }
    //passed this so insert
    const [newUser] = await db
      .insert(users)
      .values({ email, username, password: hashedPassword })
      .returning();

    return c.json({ id: newUser.id, email: newUser.email }, 201);
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    //does hashing and comparing using the bcrypt js library
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    // now we know the user is authenticated so we generate a JWT and pass to frontend
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(JWT_SECRET);

    return c.json({ token });
    // Fetch the user and comparehash the password
  });
