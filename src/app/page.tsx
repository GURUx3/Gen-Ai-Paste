'use client'

import { Button } from "@/components/ui/button"
import { ToggleThemeButton } from "@/components/toggle-theme-button"
import { Sparkles, Repeat, Rocket, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null // Prevent hydration mismatch

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center px-4">
      {/* Header */}
      <motion.header
        className="w-full max-w-7xl py-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-xl font-bold tracking-tight cursor-pointer"
          onClick={() => router.push('/home')}
        >
          GEN–TO–PASTE
        </h1>
        <div className="flex items-center gap-4  ">
          <div className=' lg:inline hidden '>
          <ToggleThemeButton  />
          </div>
          <Button variant="ghost" onClick={() => router.push('/login')}>Log In</Button>
          <Button variant="default" onClick={() => router.push('/register')}>Sign Up</Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="text-center mt-52 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <motion.h2
          className="text-4xl lg:text-7xl font-black tracking-tight leading-tight underline-offset-2"
          variants={fadeUp}
          custom={1}
        >
          Repurpose Smarter,
          <span className="highlight-underline decoration-sky-500"> Not Harder</span>
        </motion.h2>

        <motion.p
          className="mt-4 text-2xl text-muted-foreground"
          variants={fadeUp}
          custom={2}
        >
          Upload once. Our AI transforms your content for every platform.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <Button
            className="mt-20 lg:mt-40 px-6 py-5 cursor-pointer text-base font-bold"
            onClick={() => router.push('/dashboard')}
          >
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="mt-32 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
      >
        {[
          {
            title: "One-Click Repurpose",
            desc: "Turn blogs, videos, or podcasts into posts instantly.",
            icon: Repeat,
          },
          {
            title: "Platform-Optimized",
            desc: "Auto-adjust content for Twitter, LinkedIn, TikTok, and more.",
            icon: Rocket,
          },
          {
            title: "AI Templates",
            desc: "Generate hooks, captions, and summaries like a pro.",
            icon: Sparkles,
          },
        ].map(({ title, desc, icon: Icon }, i) => (
          <motion.div
            key={i}
            className="bg-card p-6 rounded-2xl shadow hover:shadow-lg transition-shadow"
            variants={fadeUp}
            custom={i + 1}
          >
            <Icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="mt-32 py-6 w-full text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        &copy; {new Date().getFullYear()} Gen-to-Paste. Built for creators.
      </motion.footer>
    </main>
  )
}
