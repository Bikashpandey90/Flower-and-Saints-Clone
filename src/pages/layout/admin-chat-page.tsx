
import { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UserSidebar from '@/components/User-sidebar/user-sidebar'
import ChatView from '@/components/Chat-view/chat-view'
import { useDispatch } from 'react-redux'
import { getUserList } from '@/reducer/chat-reducer'
import { AppDispatch } from '@/config/store.config'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/auth-context'

export interface User {
  _id: string
  name: string
  email: string
  role: string
  image: string
}
export const Chat = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const auth = useContext(AuthContext) as { loggedInUser: any }
  useEffect(() => {
    if (!auth.loggedInUser) {
      navigate('/login')
    }
  }, [auth])




  const [selectedUser, setSelectedUser] = useState<User | null>(null)


  useEffect(() => {
    dispatch(getUserList());
  }, [])

  return (
    <div className="flex h-[calc(100vh-120px)] bg-gray-100">
      <UserSidebar onSelectUser={setSelectedUser} users={[]} />
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedUser ? selectedUser._id : 'empty'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1  overflow-hidden"
        >
          {selectedUser ? (
            <ChatView user={selectedUser} />
          ) : (
            <EmptyStateView />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
function EmptyStateView() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to the Chat</h2>
        <p className="text-gray-500">Select a user to start messaging</p>
      </motion.div>
    </div>
  )
}