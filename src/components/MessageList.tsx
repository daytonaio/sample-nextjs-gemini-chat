import React, { useMemo } from "react"
import styles from "./styles/chat.module.css"
import { Message } from "ai/react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

type Props = {
    messages: Message[]
}

const MessageList = ({ messages }: Props) => {
    const isPending = useMemo(() => messages.length % 2 === 1, [messages])
    if (!messages) return null
    return (
        <div className="flex flex-col gap-2 px-4">
            {messages.map(message => (
                <div
                    key={message.id}
                    className={cn("flex", {
                        "justify-end": message.role === "user",
                        "justify-start": message.role === "assistant"
                    })}
                >
                    <div className={cn("rounded-lg text-sm p-2 shadow-md ring-1 ring-gray-900/10 text-white", {
                        "bg-blue-600": message.role === "user",
                        "bg-slate-800": message.role === "assistant"
                    })}>
                        <ReactMarkdown>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}
            {
                isPending && <div className={"flex justify-start"}>
                    <div className={"rounded-lg text-sm p-2 shadow-md ring-1 ring-gray-900/10 text-white bg-slate-800"}>
                        <div className={styles.loading}>
                            Let me see
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default MessageList