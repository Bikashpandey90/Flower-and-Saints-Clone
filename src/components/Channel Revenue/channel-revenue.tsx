import { Building2, ShoppingCart, Smartphone } from 'lucide-react'

const channels = [
  {
    name: "Online store",
    amount: "$2.9K",
    percentage: "28%",
    icon: ShoppingCart,
  },
  {
    name: "Physical store",
    amount: "$2.6K",
    percentage: "32%",
    icon: Building2,
  },
  {
    name: "Social Media",
    amount: "$2.1K",
    percentage: "40%",
    icon: Smartphone,
  },
]

export function ChannelRevenue() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Growth Rate</p>
          <p className="text-2xl font-bold">3.4%</p>
        </div>
      </div>
      <div className="space-y-4">
        {channels.map((channel) => (
          <div key={channel.name} className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
              <channel.icon className="h-5 w-5" />
            </div>
            <div className="ml-4 space-y-1 flex-1">
              <p className="text-sm font-medium leading-none">{channel.name}</p>
              <p className="text-sm text-muted-foreground">{channel.amount}</p>
            </div>
            <div className="ml-auto font-medium">{channel.percentage}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

