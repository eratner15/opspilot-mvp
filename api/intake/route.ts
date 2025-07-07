import { NextResponse } from "next/server"
import { submitIntake } from "@/apps/intake/actions"

export async function POST(req: Request) {
  const body = await req.json()
  const job = await submitIntake(body)
  return NextResponse.json(job)
}
