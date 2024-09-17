const express = require("express");
const app = express();
const client = require("./db");

// Connect to the database asynchronously
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error.stack);
    // Optionally, you can exit the process or handle the retry logic here
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Call the function to connect to the database
connectToDatabase();

// Define route handlers
app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users;");
    console.log(result.rows); // Use resuindex.jslt.rows to get the data from the query
    res.send("Hello World");
  } catch (error) {
    console.error("Error querying the database:", error.stack);
    // Attempt to create the table if an error occurs
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      res.send("Table created");
    } catch (createTableError) {
      console.error("Error creating the table:", createTableError.stack);
      res.status(500).send("Database error");
    }
  }
});

app.get("/test", (req, res) => {
  res.send("Love You");
});

// Start the server
app.listen(3000, () => console.log("Server listening on Port 3000"));
