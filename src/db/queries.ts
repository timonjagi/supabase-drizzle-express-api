import { db } from './db';
import { cities, countries, City, Country } from './schema';

export async function getAllCities() {
  const allCities = await db.select().from(cities);
  return allCities;
}

export async function getAllCitiesWithCountries() {
  const cities = await db.query.cities.findMany({
    with: {
      country: true
    }
  });
  return cities;
}

export async function getAllCountries() {
  const allCountries = await db.select().from(countries);
  return allCountries;
}


export async function getAllCountriesWithCities() {
  const countries = await db.query.countries.findMany({
    with: {
      cities: true
    }
  });
  return countries;
}

export async function insertCity(newCities: City[]) {
  if (!newCities) {
    throw new Error('No cities provided');
  }
  const insertedCities = await db.insert(cities).values(newCities).returning();
  return insertedCities;
}

export async function insertCountry(newCountries: Country[]) {
  if (!newCountries) {
    throw new Error('No countries provided');
  }
  const insertedCountries = await db.insert(countries).values(newCountries).returning();
  return insertedCountries;
}
