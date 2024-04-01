import { InferModel, relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
}, (countries) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(countries.name),
  }
});

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id),
  popularity: popularityEnum('popularity'),
});

export type City = InferModel<typeof cities>
export type Country = InferModel<typeof countries>

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));

export const cititesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
}));