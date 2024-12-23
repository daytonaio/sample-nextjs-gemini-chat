import { getStreamFromContext } from "@/lib/gemini"
import { NextResponse } from "next/server"

// POST /api/chat
export async function POST(req: Request) {
    try {
        const { messages } = await req.json()
        return await getStreamFromContext(messages)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}