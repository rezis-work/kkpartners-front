'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const total = targetDate.getTime() - new Date().getTime()
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor((total / (1000 * 60 * 60 * 24)) % 7)
  const weeks = Math.floor(total / (1000 * 60 * 60 * 24 * 7))

  return { weeks, days, hours, minutes, seconds }
}

export default function CountdownTimer() {
  const targetDate = new Date('2026-01-01')
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])
  return (
    <div className="flex   gap-8 text-lg md:text-xl">
      <div style={{ fontSize: '48px' }} className="text-center">
        {timeLeft.weeks} <span className="block text-sm">Weeks</span>
      </div>
      <div style={{ fontSize: '48px' }} className="text-center">
        {timeLeft.days} <span className="block text-sm">Days</span>
      </div>
      <div style={{ fontSize: '48px' }} className="text-center">
        {timeLeft.hours} <span className="block text-sm">Hours</span>
      </div>
      <div style={{ fontSize: '48px' }} className="text-center">
        {timeLeft.minutes} <span className="block text-sm">Minutes</span>
      </div>
      <div style={{ fontSize: '48px' }} className="text-center">
        {timeLeft.seconds} <span className="block text-sm">Seconds</span>
      </div>
    </div>
  )
}
