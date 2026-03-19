import Anthropic from "@anthropic-ai/sdk";

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateMeetingSummary(transcript: string) {
  const response = await claude.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1500,
    system: "You are an AI assistant that summarizes meeting transcripts. Extract a concise summary, key decisions, and a list of action items.",
    messages: [
      {
        role: "user",
        content: `Please analyze this meeting transcript and return the result as a JSON object with 'summary' (string), 'decisions' (array of strings), and 'action_items' (array of strings):\n\n${transcript}`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  
  if (textBlock && textBlock.type === "text") {
    return textBlock.text;
  }
  
  return "";
}
