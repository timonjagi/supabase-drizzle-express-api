import express from 'express'
import { cities, countries } from './db/schema';
import { db } from './db/db';
import { getAllCities, getAllCitiesWithCountries, getAllCountries, getAllCountriesWithCities, insertCity, insertCountry } from './db/queries';
import * as bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || '3300';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hey sexy')
});

app.get('/cities', async (req, res) => {
  const allCities = await getAllCities();
  return res.json(allCities);
});

app.get('/countries', async (req, res) => {
  const allCountries = await getAllCountries();
  return res.json(allCountries);
})

app.get('/countries-with-cities', async (req, res) => {
  const allCountriesWithCities = await getAllCountriesWithCities();
  return res.json(allCountriesWithCities);
})

app.get('/cities-with-country', async (req, res) => {
  const allCitiesWithCountries = await getAllCitiesWithCountries();
  return res.json(allCitiesWithCountries);
})

app.post('/cities', async (req, res) => {
  const cities = await insertCity(req.body);
  return res.send(JSON.stringify(cities, null, 2))
})

// insert countries
app.post('/countries', async (req, res) => {
  const countries = await insertCountry(req.body);
  return res.send(JSON.stringify(countries, null, 2))
})

app.listen(port, () => {
  return console.log('App listening on port: ', port)
})