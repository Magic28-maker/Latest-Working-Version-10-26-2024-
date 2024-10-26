import { config } from 'dotenv';
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.NODE_ENV === 'production' 
  ? process.env.DATABASE_URL 
  : join(__dirname, '../db/database.sqlite');

const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export default db;