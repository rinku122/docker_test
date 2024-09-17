const express = require("express");
const app = express();
const axios = require("axios");
const { Kafka } = require("kafkajs");

// Kafka configuration
const kafka = new Kafka({
  clientId: "your-app-client-id",
  brokers: ["kafka:9092"], // Replace with your Kafka broker addresses
});

const producer = kafka.producer();

// Initialize Kafka producer
const startKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka producer connected");
};

// Define route handlers
app.get("/", async (req, res) => {
  let response = { data: null };
  try {
    response = await axios.get("http://app:3000/test");
  } catch (error) {
    // console.log(error);
  }
  console.log(response.data);

  // Send message to Kafka topic
  await producer.send({
    topic: "your-topic-name",
    messages: [{ value: "Hello Kafka!" }],
  });

  res.send("Second Running");
});

// Start the server
app.listen(3001, () => console.log("Server listening on Port 3001"));

// Start Kafka producer
startKafkaProducer().catch(console.error);
