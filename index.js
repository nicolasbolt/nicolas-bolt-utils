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

// Truncate Text
export function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// Get Initials from Name
export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

// MongoDB functions

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
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
export async function openaiTextToSpeech(
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
