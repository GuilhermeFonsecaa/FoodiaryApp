import OpenAI, { toFile } from "openai";

const client = new OpenAI();

export async function transcribeAudio(file: Buffer) {
  const transcription = await client.audio.transcriptions.create({
    model: "whisper-1",
    language: "pt",
    response_format: "text",
    file: await toFile(file, "audio.m4a", { type: "audio/m4a" }),
  });

  return transcription;
}
