"use client"
import React from "react"
import { Input } from "./ui/input"
import { useChat } from "ai/react"
import { Send } from "lucide-react"
import { Button } from "./ui/button"
import MessageList from "./MessageList"

const Chat = () => {
    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chat",
    })

    React.useEffect(() => {
        // Auto-scroll messages to the bottom
        const messageContainer = document.getElementById("message-container")
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])

    return (
        <div className="relative h-full" id="message-container">
            <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
                <h3 className="text-xl font-bold">
                    Chat with Gemini
                </h3>
            </div>
            <MessageList messages={messages} />
            <form onSubmit={handleSubmit} className="bottom-0 inset-x-0 px-2 py-4 bg-white">
                <div className="flex">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="What are your thoughts..."
                        className="w-full"
                    />
                    <Button className="bg-blue-600 ml-2">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Chat