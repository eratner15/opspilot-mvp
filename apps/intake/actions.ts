"use server"

import { intakeSchema } from "./schema"
import { processIntake } from "@/lib/ai/intake-agent"
import { saveIntake } from "@/db/models/intake"

export async function submitIntake(data: unknown) {
  const parsed = intakeSchema.parse(data)
  const job = await processIntake(parsed.rawInput)
  await saveIntake(job)
  return job
}
