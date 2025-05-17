
type Props = {
    id?: string
    image: string
    fullname: string
    position: string
  }
  
  export default function PartnerCard({ image, fullname, position }: Props) {
    return (
      <div className="transition duration-500 group block cursor-default">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={fullname}
            className="w-full h-68 object-cover transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
        <h3 className="text-xl text-[#291616] font-semibold mt-4 group-hover:underline">
          {fullname}
        </h3>
        <p className="text-[#291616]">{position}</p>
      </div>
    )
  }
  