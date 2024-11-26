import mongoose from "mongoose";

// String and Date manipulation functions
export function slugify(val) {
  return val.toLowerCase().replace(/ /g, "-");
}

export function deslugify(val) {
  return val.replace(/-/g, " ");
}

export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

// MongoDB functions

let connected = false;

export async function connectDB() {
  mongoose.set("strictQuery", true);

  // If the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to db in connectDB");
    console.error(error);
  }
}
