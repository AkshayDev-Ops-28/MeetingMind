import Groq from "groq-sdk"

export async function generateMeetingSummary(transcript: string) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
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