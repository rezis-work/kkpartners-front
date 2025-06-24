import { useEffect, useState } from 'react'

interface ScrollButtProps {
  id?: string
}

export default function ScrollButt({ id }: ScrollButtProps) {
  const [visible, setVisible] = useState(false)

  // scroll listener — აჩენს ღილაკს როცა ქვემოთ ხარ
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!visible) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-30 right-4 z-50 bg-amber-950  text-white px-4 py-2 shadow-lg transition cursor-pointer w-[60px] h-[60px] text-2xl
      "
    >
      ↑
    </button>
  )
}
