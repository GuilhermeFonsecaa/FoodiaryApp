import { date, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  goal: varchar({ length: 8 }).notNull(),
  gender: varchar({ length: 6 }).notNull(),
  birthDate: date('birth_date').notNull(),
  height: integer().notNull(),
  weight: integer().notNull(),
  activityLevel: integer('activity_level').notNull(),
  
  // Goals
  calories: integer().notNull(),
  proteins: integer().notNull(),
  carbohydrates: integer().notNull(),
  fats: integer().notNull(),
});