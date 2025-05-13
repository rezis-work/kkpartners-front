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
    <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="w-full sm:w-20 md:w-auto text-center"
          style={{ fontSize: '40px' }}
        >
          {value}
          <span className="block text-xs sm:text-sm capitalize">{label}</span>
        </div>
      ))}
    </div>
  )
}
