'use client';
import { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    }

    // Add bot response (example)
    const botMessage = {
      id: (Date.now() + 1).toString(),
      content: "I'll help you assess that. Can you provide more details?",
      role: 'bot',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setMessage('')
  }

  if (showSplash) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div
          data-aos="fade-down"
          className="relative mb-8 h-48 w-48"
        >
          <img
            src="/mascot.gif"
            alt="CareSense Mascot"
            className="h-full w-full object-contain"
          />
        </div>
        <h1
          data-aos="fade-up"
          className="bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 bg-clip-text text-center text-4xl font-bold text-transparent"
        >
          Assess your health risks in minutes using CareSense
        </h1>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Chat Container */}
      <div className="flex-1 p-4">
        <div className="mx-auto max-w-4xl h-[calc(100vh-180px)]">
          <ScrollArea className="h-full pr-4">
            <div
              className="flex flex-col items-center justify-center h-full space-y-6 py-6"
              data-aos="fade-up"
            >
              <div className="relative h-48 w-48">
                <img
                  src="/mascot-hi.gif"
                  alt="Carey the Health Assistant"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold text-center text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 bg-clip-text">
                Hi, I&apos;m Carey! Your personal health assessor. How can I help you today?
              </h2>
            </div>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {msg.role === 'bot' ? (
                      <AvatarImage src="/mascot-avatar.gif" alt="Carey" />
                    ) : (
                      <AvatarImage alt="User" />
                    )}
                    <AvatarFallback>
                      {msg.role === 'bot' ? 'C' : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] border border-white/25 ${
                      msg.role === 'user'
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {/* Scroll Ref at the bottom */}
              <div ref={scrollRef}></div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl flex gap-2">
          <Textarea
            placeholder="Type your health concerns here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="min-h-[60px] flex-1"
          />
          <Button
            type="submit"
            size="icon"
            className="h-[60px] w-[60px] bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}