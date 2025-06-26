type BackButtonProps = {
    label?: string
    onClick: () => void
  }
  
  export default function BackButton({ label = 'Back', onClick }: BackButtonProps) {
    return (
      <button
        onClick={onClick}
        className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-blue-600 border border-gray-300 rounded-lg px-4 py-2 transition"
      >
        {label}
      </button>
    )
  }
  