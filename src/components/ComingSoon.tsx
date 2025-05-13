import CountdownTimer from './CountdownTimer'

export default function ComingSoon() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white px-4"
      style={{ backgroundImage: "url('/images/coming-soon.jpg')" }}
    >
      <div className="absolute bottom-0 left-0 m-0 bg-[#4B2524] w-full sm:max-w-xl px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-12 md:pb-18 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-[38px] font-[400] tracking-wide font-lora text-white mb-4 sm:mb-6">
          New site <span className="text-[#A59292]">coming soon</span>
        </h2>

        <p className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed max-w-md mx-auto sm:mx-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum euis sed contempor
          dibidus dictum elit, sed do eiusmod tempor incididunt ut labore
        </p>

        <CountdownTimer />

        <button className="mt-6 px-6 py-2 bg-white text-black hover:bg-gray-200 transition">
          Get In Touch
        </button>
      </div>
    </div>
  )
}
