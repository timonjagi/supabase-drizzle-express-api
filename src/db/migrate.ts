import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db } from './db';

const migrateDB = async () => {
  console.log('migrating db');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('db migrated successfully')
}

migrateDB();