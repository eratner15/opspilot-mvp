import { randomUUID } from "crypto"
import { StructuredJob } from "@/apps/intake/types"

function detectLanguage(text: string): string {
  const spanishWords = ["el", "la", "que", "de", "y", "en", "un"]
  const lowered = text.toLowerCase()
  const hits = spanishWords.filter((w) => lowered.includes(w)).length
  return hits > 2 ? "es" : "en"
}

export async function processIntake(rawInput: string): Promise<StructuredJob> {
  const job: StructuredJob = {
    id: randomUUID(),
    rawInput,
    issue: rawInput.trim(),
    language: detectLanguage(rawInput),
    createdAt: new Date().toISOString(),
  }
  return job
}
