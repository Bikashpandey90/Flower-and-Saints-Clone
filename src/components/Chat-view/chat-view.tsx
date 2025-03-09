import { useState, useRef, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useDispatch } from 'react-redux'
import { getChatDetail, sendChatDetail } from '@/reducer/chat-reducer'
import { AppDispatch } from '@/config/store.config'
import { useSelector } from 'react-redux'
import socket from '@/config/socket'
import { AuthContext } from '@/context/auth-context'
export interface User {
  _id: string
  name: string
  email: string
  role: string
  image: string
}
interface ChatViewProps {
  user: User
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

export default function ChatView({ user }: ChatViewProps) {
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
    dispatch(getChatDetail(user._id))

  }, [user])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setInputMessage('')
    //api to send messages
    dispatch(sendChatDetail({
      receiver: user._id,
      message: inputMessage
    }))
    socket.emit('newMessage', {
      receiver: user?._id,
      sender: auth.loggedInUser._id


    })

  }

  const openConnect = () => {
    //initialize socket
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
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-4">
        <Avatar>
          <AvatarImage className='object-cover' src={user.image} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4 " ref={scrollAreaRef}>
        {messages && messages.map((message: Message, index: number) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`mb-4 ${message.receiver === user._id ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg  ${message.receiver === user._id
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
        <div className="bg-white p-4 shadow-sm">
          <div className="flex space-x-2">

            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter'}
              className="flex-1"
            />
            <Button type='submit' >Send</Button>

          </div>
        </div>
      </form>
    </div>
  )
}