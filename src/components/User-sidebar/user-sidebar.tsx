import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector } from 'react-redux'
import { Users } from 'lucide-react'

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // useEffect(() => {
  //   const filteredUsers = users?.filter(user =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.role.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) || []
  // }, [searchTerm])



  return (
    // <div className="w-90 bg-white border-r  border-gray-200 flex flex-col">
    //   <div className="p-4">
    //     <Input
    //       type="text"
    //       placeholder="Search users..."
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       className="w-full"
    //     />
    //   </div>
    //   <ScrollArea className="flex-1">
    //     {users && users.map((user, index) => (
    //       <motion.div
    //         key={user._id}
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.3, delay: index * 0.1 }}
    //       >
    //         <button
    //           onClick={() => onSelectUser(user)}
    //           className="w-full text-left p-4 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-4"
    //         >
    //           <Avatar>
    //             <AvatarImage className='object-cover' src={user.image} alt={user.name} />
    //             <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    //           </Avatar>
    //           <div>
    //             <h3 className="font-semibold text-gray-900">{user.name}</h3>
    //             <p className="text-sm text-gray-500">{user.email}</p>
    //             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">
    //               {user.role === 'admin' ? 'Administrator' : user.role === 'seller' ? 'Seller' : 'Customer'}
    //             </span>
    //           </div>
    //         </button>
    //       </motion.div>
    //     ))}
    //   </ScrollArea>
    // </div>

    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all  duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              // checked={showOnlineOnly}
              // onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">(88 online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users && users.map((user) => (
          <button
            onClick={() => {
              onSelectUser(user)
              setSelectedUser(user)
            }}

            className={`
        w-full p-3 flex items-center gap-3
        hover:bg-base-300 transition-colors
        ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
      `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {users.map((u) => u._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
            rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {users.map((u) => u._id).includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users && users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  )
}