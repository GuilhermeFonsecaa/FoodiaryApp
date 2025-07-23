import {
  date,
  integer,
  json,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  goal: varchar({ length: 8 }).notNull(),
  gender: varchar({ length: 6 }).notNull(),
  birthDate: date("birth_date").notNull(),
  height: integer().notNull(),
  weight: integer().notNull(),
  activityLevel: integer("activity_level").notNull(),

  // Goals
  calories: integer().notNull(),
  proteins: integer().notNull(),
  carbohydrates: integer().notNull(),
  fats: integer().notNull(),
});

//saber se a refeição já foi processada
export const mealStatus = pgEnum("meal_status", [
  "uploading",
  "processing",
  "success",
  "failed",
]);

export const mealInputType = pgEnum("meal_input_type", ["audio", "picture"]);

export const mealsTable = pgTable("meals", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  status: mealStatus().notNull(),
  inputType: mealInputType("input_type").notNull(),
  //id do arquivo no s3
  inputFileKey: varchar("input_file_key", { length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 100 }).notNull(),
  foods: json(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
