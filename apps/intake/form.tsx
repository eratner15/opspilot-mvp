"use client"
import { useState, useRef } from "react"
import { submitIntake } from "./actions"

export function IntakeForm() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [recording, setRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  function toggleRecording() {
    if (recording) {
      recognitionRef.current?.stop()
      setRecording(false)
      return
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition not supported")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.continuous = true
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ")
      setInput((prev) => `${prev} ${transcript}`)
    }
    recognition.start()
    recognitionRef.current = recognition
    setRecording(true)
  }

  async function handleSubmit() {
    setLoading(true)
    await submitIntake({ rawInput: input })
    setLoading(false)
    setInput("")
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your issue or record audio..."
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={toggleRecording}
          className="bg-gray-200 px-4 py-2 rounded"
          type="button"
        >
          {recording ? "Stop" : "Record"}
        </button>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
          type="button"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
