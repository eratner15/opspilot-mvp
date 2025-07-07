import { z } from "zod"

export const intakeSchema = z.object({
  rawInput: z.string().min(1, "Input is required"),
})

export type IntakeInput = z.infer<typeof intakeSchema>
