import { StructuredJob } from "@/apps/intake/types"

const intakes: StructuredJob[] = []

export async function saveIntake(data: StructuredJob) {
  intakes.push(data)
}

export async function listIntakes() {
  return intakes
}
