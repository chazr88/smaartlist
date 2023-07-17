const db = require('./db');

async function createSchema() {
  // Create your schema and table using SQL statements
  const createSchemaQuery = `
    CREATE SCHEMA IF NOT EXISTS my_schema;
    
    CREATE TABLE IF NOT EXISTS my_schema.lists (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      items JSONB
    );
  `;

  try {
    // Connect to the database
    await db.connect();

    // Execute the SQL statement to create the schema and table
    await db.query(createSchemaQuery);

    console.log('Schema created successfully');
  } catch (error) {
    console.error('Error creating schema:', error);
  } finally {
    // Close the database connection
    db.end();
  }
}

module.exports = createSchema;
