import {pgTable, integer, varchar, text, timestamp, pgEnum} from 'drizzle-orm/pg-core';
import {createId} from "@paralleldrive/cuid2";

// WILL USE THIS TO HANDLE SNIPPETS THAT WILL BE PUBLIC AND THOSE THAT WILL BE PRIVATE
export const visibilityEnum = pgEnum("visibility", ["public", "private"]);


export const users = pgTable('users',{

    id: text('id').primaryKey().$defaultFn(()=>createId()),
    email: text('email').notNull().unique(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
    avatarUrl: text("avatar_url"),
    createAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),

});

export const snippets = pgTable('snippets', {

    id:text('id').primaryKey().$defaultFn(()=>createId()),
    title: text('title').notNull(),
    description: text('description'),
    code: text('code').notNull(),
    language: text("language").notNull(),
    visibility: visibilityEnum('visibility').notNull().default("private"),
    userId: text('userId').notNull().references(() => users.id,{onDelete:"cascade"}), // foreign key to users table , users.id
    collectionId: text('collectionId').references(() => collections.id,{onDelete:"set null"}), // foreign key to collections table , collections.id
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),


});

export const collections = pgTable('collections', {
    id: text('id').primaryKey().$defaultFn(()=>createId()),
    name: text('name').notNull(),
    description: text('description'),
    userId: text('userId').notNull().references(() => users.id,{onDelete:"cascade"}), // foreign key to users table , users.id
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tags = pgTable('tags', {
    id: text('id').primaryKey().$defaultFn(()=>createId()),
    name: text('name').notNull().unique(),
    user_id: text("user_id").notNull().references(() => users.id,{onDelete:"cascade"}), // foreign key to users table , users.id
});

export const snippetTags  = pgTable('snippet_tags', {
    snippetId: text('snippet_id').notNull().references(() => snippets.id,{onDelete:"cascade"}), // foreign key to snippets table , snippets.id
    tagId: text('tag_id').notNull().references(() => tags.id,{onDelete:"cascade"}), // foreign key to tags table , tags.id

});