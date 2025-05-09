import CountdownTimer from '../CountdownTimer'

export default function ComingSoon() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white px-4"
      style={{ backgroundImage: "url('/images/coming-soon.jpg')" }}
    >
      <div className="absolute bottom-0 left-0 m-0 bg-[#4B2524] pt-14 pb-18 px-8 text-left max-w-xl w-full md:w-auto">
        <h2
          className="text-[38px] font-[400] tracking-[0.12em] break-words font-lora text-white mb-6"
        >
          New site <span className="text-[#A59292]">coming soon</span>
        </h2>

        <p className="text-sm md:text-base mb-6 leading-relaxed">
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
