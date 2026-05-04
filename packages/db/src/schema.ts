import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// WILL USE THIS TO HANDLE SNIPPETS THAT WILL BE PUBLIC AND THOSE THAT WILL BE PRIVATE
export const visibilityEnum = pgEnum('visibility', ['public', 'private']);

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  avatarUrl: text('avatar_url'),
  createAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const snippets = pgTable(
  'snippets',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text('title').notNull(),
    description: text('description'),
    code: text('code').notNull(),
    language: text('language').notNull(),
    visibility: visibilityEnum('visibility').notNull().default('private'),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // foreign key to users table , users.id
    collectionId: text('collectionId').references(() => collections.id, {
      onDelete: 'set null',
    }), // foreign key to collections table , collections.id
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    // Most common query: "fetch all snippets for a user" — without this, Postgres scans the entire table
    index('snippets_user_id_idx').on(table.userId),
    // Speeds up filtering/grouping snippets by collection
    index('snippets_collection_id_idx').on(table.collectionId),
  ],
);

export const collections = pgTable(
  'collections',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name').notNull(),
    description: text('description'),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // foreign key to users table , users.id
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    // "Fetch all collections for a user" is a common list-page query
    index('collections_user_id_idx').on(table.userId),
  ],
);

export const tags = pgTable(
  'tags',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name').notNull().unique(),
    user_id: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // foreign key to users table , users.id
  },
  (table) => [
    // "Fetch all tags for a user" is needed to populate the sidebar tag list
    index('tags_user_id_idx').on(table.user_id),
  ],
);

export const snippetTags = pgTable(
  'snippet_tags',
  {
    snippetId: text('snippet_id')
      .notNull()
      .references(() => snippets.id, { onDelete: 'cascade' }), // foreign key to snippets table , snippets.id
    tagId: text('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }), // foreign key to tags table , tags.id
  },
  (table) => [
    // Composite PK prevents duplicate (snippet, tag) pairs — same tag can't be added twice
    primaryKey({ columns: [table.snippetId, table.tagId] }),
    // Speeds up "fetch all snippets with tag X" (reverse lookup)
    index('snippet_tags_tag_id_idx').on(table.tagId),
  ],
);
