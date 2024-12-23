import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const GEMINI_AI_SYSTEM_INSTRUCTION = "MODIFY THIS TEXT FOR CUSTOM AI SYSTEM INSTRUCTIONS.";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


async function buildGoogleGenAIPrompt(messages: Message[]) {
    return {
        contents: messages
            .map((message) => ({
                role: message.role === "user" ? "user" : "model",
                parts: [
                    {
                        text: message.content
                    }
                ]
            }))
    }
}

async function getStreamFromContext(messages: Message[]) {
    try {
        const genModel = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: GEMINI_AI_SYSTEM_INSTRUCTION
        })

        const geminiStream = await genModel.generateContentStream(await buildGoogleGenAIPrompt(messages))
        console.log("Generating content...")
        const stream = GoogleGenerativeAIStream(geminiStream)
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error(error)
    }
}

export {
    getStreamFromContext
}
