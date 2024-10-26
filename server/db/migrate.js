import { config } from 'dotenv';
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
const schema = `
  -- Contact submissions
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Directory submissions
  CREATE TABLE IF NOT EXISTS directory_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bar_number TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    profile_photo TEXT,
    firm TEXT,
    bio TEXT,
    address TEXT,
    city TEXT,
    zip TEXT,
    county TEXT,
    latitude REAL,
    longitude REAL,
    website TEXT,
    plan TEXT NOT NULL DEFAULT 'basic',
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Create index for geographical searches
  CREATE INDEX IF NOT EXISTS idx_directory_geo 
  ON directory_submissions(latitude, longitude);

  -- Create index for text searches
  CREATE INDEX IF NOT EXISTS idx_directory_location 
  ON directory_submissions(city, zip, county);

  -- Practice areas for directory submissions
  CREATE TABLE IF NOT EXISTS directory_practice_areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    directory_submission_id INTEGER NOT NULL,
    practice_area TEXT NOT NULL,
    FOREIGN KEY (directory_submission_id) 
      REFERENCES directory_submissions(id) 
      ON DELETE CASCADE
  );

  -- Languages for directory submissions
  CREATE TABLE IF NOT EXISTS directory_languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    directory_submission_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    FOREIGN KEY (directory_submission_id) 
      REFERENCES directory_submissions(id) 
      ON DELETE CASCADE
  );

  -- Education entries for directory submissions
  CREATE TABLE IF NOT EXISTS directory_education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    directory_submission_id INTEGER NOT NULL,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    year TEXT,
    FOREIGN KEY (directory_submission_id) 
      REFERENCES directory_submissions(id) 
      ON DELETE CASCADE
  );

  -- Oregon ZIP codes and geo data
  CREATE TABLE IF NOT EXISTS oregon_geo_data (
    zip TEXT PRIMARY KEY,
    city TEXT NOT NULL,
    county TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  );

  -- Insert some sample Oregon ZIP codes
  INSERT OR IGNORE INTO oregon_geo_data (zip, city, county, latitude, longitude) VALUES
    ('97205', 'Portland', 'Multnomah', 45.5223, -122.6850),
    ('97401', 'Eugene', 'Lane', 44.0521, -123.0868),
    ('97301', 'Salem', 'Marion', 44.9429, -123.0351),
    ('97330', 'Corvallis', 'Benton', 44.5646, -123.2620),
    ('97501', 'Medford', 'Jackson', 42.3265, -122.8756),
    ('97701', 'Bend', 'Deschutes', 44.0582, -121.3153),
    ('97850', 'La Grande', 'Union', 45.3246, -118.0877),
    ('97103', 'Astoria', 'Clatsop', 46.1879, -123.8313),
    ('97814', 'Baker City', 'Baker', 44.7749, -117.8344),
    ('97741', 'Madras', 'Jefferson', 44.6335, -121.1296);

  -- Create reviews table
  CREATE TABLE IF NOT EXISTS lawyer_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    directory_submission_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    reviewer_name TEXT,
    verified_client BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (directory_submission_id) 
      REFERENCES directory_submissions(id) 
      ON DELETE CASCADE
  );

  -- Create index for reviews
  CREATE INDEX IF NOT EXISTS idx_lawyer_reviews 
  ON lawyer_reviews(directory_submission_id, rating);
`;

// Execute schema
db.exec(schema);

console.log('Database schema initialized successfully');

// Close database connection
db.close();