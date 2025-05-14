import { X } from "lucide-react";
export interface User {
    _id: string
    name: string
    email: string
    role: string
    image: string
    status: 'active' | 'inactive'
}
interface ChatViewProps {
    user: User | null
}

const ChatHeader = ({ user }: ChatViewProps) => {

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={user?.image || "/avatar.png"} alt={user?.name} />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{user?.name}</h3>
                        <p className="text-sm text-base-content/70">
                            {user?.status === 'active' ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => { }}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;
