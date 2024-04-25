const { Client } = require('pg');
const url = require('url');

// Retrieve the DATABASE_URL environment variable
const DATABASE_URL = process.env.DATABASE_URL;

// Parse the DATABASE_URL
const params = url.parse(DATABASE_URL);
const auth = params.auth.split(':');

const dbConfig = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: {
    rejectUnauthorized: false // Necessary if using self-signed certificate
  }
};

// Create a new PostgreSQL client with the parsed configuration
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database:', err));
