"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "Immersive E-commerce Platform",
    description: "A next-generation shopping experience with 3D product visualization and AR try-on features.",
    tags: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://example.com/project1",
    github: "https://github.com/yourusername/project1",
    color: "#4F46E5",
  },
  {
    id: 2,
    title: "AI-Powered Content Creator",
    description: "A tool that leverages machine learning to generate and optimize content for various platforms.",
    tags: ["React", "Node.js", "TensorFlow.js", "OpenAI"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://example.com/project2",
    github: "https://github.com/yourusername/project2",
    color: "#10B981",
  },
  {
    id: 3,
    title: "Financial Dashboard",
    description: "Real-time analytics and visualization platform for tracking investments and financial metrics.",
    tags: ["TypeScript", "D3.js", "Firebase", "Material UI"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://example.com/project3",
    github: "https://github.com/yourusername/project3",
    color: "#F59E0B",
  },
  {
    id: 4,
    title: "Social Media Analytics Tool",
    description: "Comprehensive platform for tracking engagement and performance across multiple social channels.",
    tags: ["Vue.js", "Express", "MongoDB", "Chart.js"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://example.com/project4",
    github: "https://github.com/yourusername/project4",
    color: "#EC4899",
  },
  {
    id: 5,
    title: "Collaborative Workspace App",
    description: "Real-time collaboration tool with document editing, video conferencing, and task management.",
    tags: ["React", "Socket.io", "WebRTC", "Redux"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://example.com/project5",
    github: "https://github.com/yourusername/project5",
    color: "#8B5CF6",
  },
]

export default function ProjectsPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const [isCursorVisible, setIsCursorVisible] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Parallax scroll effect for the header
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <>
      {/* Custom cursor */}
      {isCursorVisible && (
        <motion.div
          className="fixed w-24 h-24 rounded-full flex items-center justify-center text-white text-sm font-medium z-50 pointer-events-none"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            x: "-50%",
            y: "-50%",
            backgroundColor: activeProject !== null ? projects[activeProject]?.color : "#000",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {cursorText}
        </motion.div>
      )}

      {/* Hero section with parallax effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div className="relative z-10 text-center px-4" style={{ y: y2, opacity }}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore my creative work and technical innovations
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
                <motion.div
                  className="w-1 h-1 bg-white rounded-full"
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects showcase */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl">
            A collection of my most significant work, showcasing my skills in design, development, and problem-solving.
          </p>
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setCursorText={setCursorText}
              setIsCursorVisible={setIsCursorVisible}
              setActiveProject={setActiveProject}
            />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Let's work together
          </motion.h2>
          <motion.p
            className="text-xl mb-10 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Have a project in mind? I'm available for freelance work and collaborations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-medium px-8 py-4 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
  setCursorText: (text: string) => void
  setIsCursorVisible: (visible: boolean) => void
  setActiveProject: (index: number | null) => void
}

function ProjectCard({ project, index, setCursorText, setIsCursorVisible, setActiveProject }: ProjectCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" })

  const isEven = index % 2 === 0
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) / 5)
    y.set((e.clientY - centerY) / 5)
  }

  const handleMouseEnter = () => {
    setCursorText("View")
    setIsCursorVisible(true)
    setActiveProject(index)
  }

  const handleMouseLeave = () => {
    setCursorText("")
    setIsCursorVisible(false)
    setActiveProject(null)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
    >
      <div className="w-full md:w-7/12">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative overflow-hidden rounded-xl shadow-2xl cursor-none"
        >
          <Link href={project.link} className="block">
            <div
              className="absolute inset-0 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: `${project.color}80` }}
            />
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-70" />
          </Link>
        </motion.div>
      </div>

      <div className="w-full md:w-5/12">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href={project.link}
              className="flex items-center gap-2 text-sm font-medium hover:underline"
              onMouseEnter={() => setCursorText("Visit")}
              onMouseLeave={() => setCursorText("View")}
            >
              <ExternalLink size={16} />
              Live Demo
            </Link>
            <Link
              href={project.github}
              className="flex items-center gap-2 text-sm font-medium hover:underline"
              onMouseEnter={() => setCursorText("Code")}
              onMouseLeave={() => setCursorText("View")}
            >
              <Github size={16} />
              Source Code
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

