import axios from "axios";

export async function analyzeSymptoms(symptoms) {
  try {
    const response = await axios.post(
      "https://hms-ai-assistant.onrender.com/analyze",
      { symptoms }, // request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("AI analysis failed:", error);
    throw new Error("AI analysis failed");
  }
}