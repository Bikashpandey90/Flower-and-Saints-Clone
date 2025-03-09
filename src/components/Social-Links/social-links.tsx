import { LucideGithub, LucideLinkedin } from "lucide-react";

export default function Socialas() {
  return (
    <div className="flex gap-4 justify-center">
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <LucideLinkedin className="w-5 h-5 text-white" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <LucideGithub className="w-5 h-5 text-white" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <span className="text-white font-bold">Be</span>
      </a>
    </div>
  )
}

