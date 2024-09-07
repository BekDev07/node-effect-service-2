require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import actionRoutes from "./routes/actionRoutes";
import { testConnection } from "./db/dbConnect";

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use("/api/v1", actionRoutes);

// Start the server
(async () => {
  try {
    await testConnection();
    app.listen(port, () => {
      console.log("App started successfully");
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error connecting to the database", err.stack);
      process.exit(1);
    }
    console.log("Unknown error occured");
  }
})();
