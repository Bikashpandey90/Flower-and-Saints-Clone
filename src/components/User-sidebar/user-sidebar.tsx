import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector } from 'react-redux'

export interface User {
  _id: string
  name: string
  email: string
  role: string
  image: string
}
interface UserSidebarProps {
  onSelectUser: (user: User) => void
  users: User[] | undefined
}


export default function UserSidebar({ onSelectUser }: UserSidebarProps) {
  const users = useSelector((root: { chat: { chatUserList: User[] } }) => {
    return root.chat.chatUserList
  })
  const [searchTerm, setSearchTerm] = useState('')

  // useEffect(() => {
  //   const filteredUsers = users?.filter(user =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.role.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) || []
  // }, [searchTerm])

  return (
    <div className="w-90 bg-white border-r  border-gray-200 flex flex-col">
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <ScrollArea className="flex-1">
        {users && users.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <button
              onClick={() => onSelectUser(user)}
              className="w-full text-left p-4 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-4"
            >
              <Avatar>
                <AvatarImage className='object-cover' src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">
                  {user.role === 'admin' ? 'Administrator' : user.role === 'seller' ? 'Seller' : 'Customer'}
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  )
}