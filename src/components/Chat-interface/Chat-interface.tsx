import { useState, useEffect, useRef, useContext } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getChatDetail, sendChatDetail } from "@/reducer/chat-reducer"
import socket from "@/config/socket"
import { useDispatch } from "react-redux"
import { AuthContext } from "@/context/auth-context"
import { AppDispatch } from "@/config/store.config"
import { useSelector } from "react-redux"
import { Input } from "../ui/input"
import { motion } from 'framer-motion'

interface ChatInterfaceProps {
    seller: User
    onClose: () => void
}
export interface User {
    _id: string
    name: string
    email: string
    role: string
    image: string
}
export interface Message {
    createdAt: Date;
    message: string;
    receiver: string;
    sender: string;
    updatedAt: Date;
    _v: number;
    _id: string;
}


export default function ChatInterface({ seller, onClose }: ChatInterfaceProps) {

    const [inputMessage, setInputMessage] = useState('')
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>();
    const auth = useContext(AuthContext) as { loggedInUser: any }


    const messages = useSelector((root: { chat: { currentUserMessage: Message[] } }) => {
        return root.chat.currentUserMessage
    })

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        dispatch(getChatDetail(seller._id))

    }, [seller])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        setInputMessage('')
        //api to send messages
        dispatch(sendChatDetail({
            receiver: seller._id,
            message: inputMessage
        }))
        socket.emit('newMessage', {
            receiver: seller?._id,
            sender: auth.loggedInUser._id


        })

    }

    const openConnect = () => {
        socket.connect();
    }

    const handleConnect = (data: any) => {
        console.log('Connected', data)

    }
    const newMessageReceived = (data: any) => {
        if (data.receiver === auth.loggedInUser?._id) {
            dispatch(getChatDetail(data.sender))

        }
    }


    useEffect(() => {
        openConnect()

        //listener
        socket.on('connected', handleConnect)
        socket.on('messageReceived', newMessageReceived)

        //release
        return () => {
            socket.off('connected', handleConnect)
            socket.off('messageReceived', newMessageReceived)
        }

    }, [])




    return (
        <div className="flex flex-col h-[50vh] max-h-[600px] min-h-[300px]">

            <ScrollArea className="flex-1 p-4 " ref={scrollAreaRef}>
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                    Hey there! How can I help you?
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {new Date().toLocaleTimeString()}
                </div>
                {messages && messages.map((message: Message, index: number) => (
                    <motion.div
                        key={message._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`mb-4 ${message.receiver === seller._id ? 'text-right' : 'text-left'}`}
                    >

                        <div
                            className={`inline-block p-3 rounded-lg  ${message.receiver === seller._id
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}
                        >
                            {message.message}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(message.createdAt).toLocaleTimeString()}
                        </div>
                    </motion.div>
                ))}
            </ScrollArea>

            <form onSubmit={handleSendMessage}>
                <div className="flex items-center mt-4 px-4 pb-4">

                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter'}
                        // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-grow mr-2"
                    />
                    <Button type="submit">Send</Button>

                </div>
            </form>
        </div >
    )
}

