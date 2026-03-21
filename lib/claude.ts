import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY
console.log("Gemini API key present:", !!apiKey)

const genAI = new GoogleGenerativeAI(apiKey!)

export async function generateMeetingSummary(transcript: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt = `Please analyze this meeting transcript and return the result as a JSON object with:
- 'summary' (string): a concise summary of the meeting
- 'decisions' (array of strings): key decisions made
- 'action_items' (array of strings): action items identified

Return ONLY the JSON object, no markdown, no code blocks, just raw JSON.

Transcript:
${transcript}`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}