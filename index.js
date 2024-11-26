import mongoose from "mongoose";
import OpenAI from "openai";
import deepgram from "deepgram";

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

// API functions

// Create OpenAI Client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Deepgram Transcribe File
export async function deepgramTranscribeFile(
  audio,
  language,
  model = "nova-2"
) {
  try {
    const response = await deepgram.listen.prerecorded.transcribeFile(audio, {
      language: language,
      model: model,
    });

    const transcript =
      response.result?.results.channels[0].alternatives[0].transcript;

    return transcript;
  } catch (error) {
    console.error("Error in deepgramTranscribeFile");
    console.error(error);
  }
}

// OpenAI Text-to-Speech
export async function deepgramTextToSpeech(
  text,
  voice = "alloy",
  model = "tts-1"
) {
  try {
    const response = await client.audio.speech.create({
      model,
      voice,
      input: text,
    });

    return response;
  } catch (error) {
    console.error("Error in deepgramTextToSpeech");
    console.error(error);
  }
}
