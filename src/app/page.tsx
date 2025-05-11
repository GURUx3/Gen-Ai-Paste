'use client'

import { Button } from "@/components/ui/button"
import { ToggleThemeButton } from "@/components/toggle-theme-button"
import {
  Sparkles, Repeat, Rocket, ChevronRight,
  ArrowRight, Settings, FileText, Video,
  Mic, Image, Check, Globe, Zap, BarChart
} from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"

// Animation variants
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

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
}

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: "/avatar-1.jpg",
    quote: "I've saved hours each week by repurposing my blog content across all platforms automatically.",
    company: "Content Creators Hub"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Podcast Host",
    avatar: "/avatar-2.jpg",
    quote: "My podcast now reaches 3x more people since using Gen-to-Paste to transform episodes into social media content.",
    company: "Tech Insights Podcast"
  },
  {
    id: 3,
    name: "Emma Garcia",
    role: "Marketing Director",
    avatar: "/avatar-3.jpg",
    quote: "The platform-specific optimization is incredible. Our engagement rates have doubled across all channels.",
    company: "Growth Marketing Co."
  }
];

// Source cards data (matching dashboard)
const sourceOptions = [
  { icon: FileText, title: "Text/Blog", desc: "Convert written content into other formats" },
  { icon: Video, title: "Video", desc: "Repurpose video content across platforms" },
  { icon: Mic, title: "Audio/Podcast", desc: "Transform audio into multiple content types" },
  { icon: Image, title: "Images", desc: "Generate content from images and graphics" }
];

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
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
          className="text-2xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          onClick={() => router.push('/home')}
        >
          GEN–TO–PASTE
        </h1>
        <div className="flex items-center gap-4">
          <div className="lg:inline hidden">
            <ToggleThemeButton />
          </div>
          <Button variant="ghost" onClick={() => router.push('/login')}>Log In</Button>
          <Button
            variant="default"
            className="relative overflow-hidden group"
            onClick={() => router.push('/register')}
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
      </motion.header>

      {/* Hero Section with Gradient Background */}
      <div className="w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-bl-[50%] rounded-br-[50%]"></div>

        <motion.section
          className="text-center pt-24 pb-16 md:pt-32 md:pb-24 px-4 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          {/* <Badge variant="outline" className="mb-4 py-1.5 px-4 bg-primary/10 border-primary/20">
            Transform Content with AI
          </Badge> */}

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
            variants={fadeUp}
            custom={1}
          >
            Repurpose Smarter,
            <span className="relative ml-2">
              <span className="highlight-underline decoration-primary underline underline-offset-7">Not Harder</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6 }}
              ></motion.span>
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeUp}
            custom={2}
          >
            Upload once. Our AI transforms your content for every platform,
            maximizing your reach without the extra work.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            custom={3}
          >
            <Button
              className="px-6 py-6 text-base font-bold w-full sm:w-auto"
              size="lg"
              onClick={() => router.push('/dashboard')}
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="px-6 py-6 text-base w-full sm:w-auto"
              size="lg"
              onClick={() => router.push('/demo')}
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {[
              { value: "10,000+", label: "Content Creators" },
              { value: "500,000+", label: "Content Pieces Created" },
              { value: "5+ hours", label: "Saved Weekly per User" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Content Source Section */}
      <section className="w-full max-w-6xl py-24 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">Choose Your Source</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start With Any Content Type</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your existing content, and our AI will transform it for every platform
            you need to reach your audience.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sourceOptions.map((source, i) => {
            const Icon = source.icon;
            return (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Card className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 h-full relative overflow-hidden group">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{source.title}</CardTitle>
                    <CardDescription>{source.desc}</CardDescription>
                  </CardHeader>

                  <CardFooter className="pt-0">
                    <Button variant="ghost" className="p-0 h-auto text-primary group-hover:underline">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          )}
        </motion.div>
      </section>

      {/* Features Section with Visual Elements */}
      <section className="w-full bg-gradient-to-b from-primary/5 to-transparent py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4">Key Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Content in Minutes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our powerful AI tools help you create platform-optimized content effortlessly.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "One-Click Repurpose",
                desc: "Transform any content type with a single click. No more manual reformatting.",
                icon: Repeat,
                color: "bg-blue-500/10 text-blue-500"
              },
              {
                title: "Platform-Optimized",
                desc: "Auto-adjust content formats for Twitter, LinkedIn, TikTok, Instagram and more.",
                icon: Globe,
                color: "bg-purple-500/10 text-purple-500"
              },
              {
                title: "AI Templates",
                desc: "Professional templates create hooks, captions, and summaries that drive engagement.",
                icon: Sparkles,
                color: "bg-amber-500/10 text-amber-500"
              },
              {
                title: "Analytics Dashboard",
                desc: "Track performance across platforms to refine your content strategy.",
                icon: BarChart,
                color: "bg-green-500/10 text-green-500"
              },
              {
                title: "Batch Processing",
                desc: "Process multiple content pieces at once, saving hours of work.",
                icon: Zap,
                color: "bg-pink-500/10 text-pink-500"
              },
              {
                title: "Custom Workflows",
                desc: "Create your own content transformation pipelines for consistent branding.",
                icon: Settings,
                color: "bg-cyan-500/10 text-cyan-500"
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${feature.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-6xl py-24 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Content Creators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how creators like you are transforming their content strategy.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="bg-card p-8 md:p-12 rounded-2xl shadow-md"
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                  <AvatarFallback className="text-lg">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xl">★</span>
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-muted-foreground">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentTestimonial === i ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                onClick={() => setCurrentTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-4 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl max-w-6xl mx-8 my-12">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Content?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators who are saving time and reaching more people with their content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-bold"
              onClick={() => router.push('/dashboard')}
            >
              Start Now — It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Free plan includes 5 content transformations per month.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="w-full max-w-6xl mx-auto pt-12 pb-8 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">GEN–TO–PASTE</h3>
            <p className="text-muted-foreground text-sm">
              Transform your content across multiple platforms with AI.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Templates", "Integrations", "API"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Guides", "Blog", "Examples", "Support"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Contact", "Privacy Policy", "Terms"]
            }
          ].map((column, i) => (
            <div key={i}>
              <h3 className="font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gen-to-Paste. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "Instagram", "YouTube"].map((social, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </motion.footer>
    </main>
  )
}