export default function SkillsSection() {
    const skills = [
      { name: 'HTML', icon: '🌐' },
      { name: 'CSS', icon: '🎨' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'React', icon: '⚛️' },
      { name: 'Git', icon: '📚' },
      { name: 'Figma', icon: '🎯' },
    ]
  
    return (
      <div className="space-y-4">
        <h3 className="text-xl">Skills</h3>
        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-center aspect-square rounded-lg bg-zinc-800 text-2xl"
            >
              {skill.icon}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          Visit the projects section to see the work done with these web technologies.
        </p>
      </div>
    )
  }
  
  