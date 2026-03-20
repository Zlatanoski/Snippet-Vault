import { Hono } from "hono";
import { SignJWT } from "jose";
import { compare, hash } from "bcryptjs";
import { db } from "../lib/db";
import {eq} from "drizzle-orm";
import { users } from "@snippet-vault/db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change",
);

export const authRoutes = new Hono()
  .post("/register", async (c) => {
    const { email, username, password } = await c.req.json();

    if (!email || !username || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const hashedPassword = await hash(password, 10);

 // Insert the registered user in the DB
    return c.json({ message: "register route — not yet implemented" }, 501);
  })
  .post("/login", async (c) => {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

  // Fetch the user and comparehash the password
    return c.json({ message: "login route — not yet implemented" }, 501);
  });