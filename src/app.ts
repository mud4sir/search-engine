import express from "express";
import mongoose from "mongoose";
import searchRoutes from "@/routes/searchRoutes";
import dotenv from "dotenv";
import logger from "@/utils/logger";
import fs from "fs/promises";
import path from "path";
import { ItemModel } from "@/models/Item";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1", searchRoutes);

const connectToMongoDB = async () => {
  try {
    logger.info(`Attempting to connect to MongoDB at ${process.env.MONGO_URI}`);
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/live-search", {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      bufferCommands: false, // Prevent buffering issues
    });
    logger.info("Connected to MongoDB");
    await seedDatabase();
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

async function seedDatabase() {
  try {
    const count = await ItemModel.countDocuments();
    if (count === 0) {
      const seedDataPath = path.join(__dirname, "..", "data", "temp.json");
      const seedData = JSON.parse(await fs.readFile(seedDataPath, "utf-8"));
      await ItemModel.insertMany(seedData);
      logger.info("Database seeded with temp.json");
    } else {
      logger.info("Database already seeded");
    }
  } catch (err) {
    logger.error("Seeding error:", err);
  }
}

connectToMongoDB();

export default app;
