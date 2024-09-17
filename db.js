const { Client } = require("pg");

const client = new Client({
  host: "adapter-db",
  port: "5432",
  database: "dev-adapter-db",
  user: "dev-postgres-db",
  password: "supersecret",
});

// const connectToDatabase = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to the database successfully!");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error.stack);
//     // Optionally, you can retry the connection here if needed
//     // setTimeout(() => connectToDatabase(), 5000); // Retry after 5 seconds
//   }
// };

// connectToDatabase();

module.exports = client;
