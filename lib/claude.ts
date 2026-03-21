import Groq from "groq-sdk"

const apiKey = process.env.GROQ_API_KEY
console.log("Groq API key present:", !!apiKey)

const groq = new Groq({ apiKey })

export async function generateMeetingSummary(transcript: string) {
  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: "You are an AI assistant that analyzes meeting transcripts. Always respond with valid JSON only. No markdown, no code blocks, just raw JSON.",
      },
      {
        role: "user",
        content: `Please analyze this meeting transcript and return a JSON object with:
- 'summary' (string): a concise summary of the meeting
- 'decisions' (array of strings): key decisions made
- 'action_items' (array of strings): action items identified

Return ONLY the JSON object, no markdown, no code blocks, just raw JSON.

Transcript:
${transcript}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 1500,
  })

  return completion.choices[0]?.message?.content || ""
}