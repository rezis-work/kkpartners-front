interface Signer {
  subtitle: string
  sign: string
}

export default function AboutMeBlock({ sign, subtitle }: Signer) {
  return (
    <div>
      <div className="  lg:mx-[50px]">
        <h2 className="text-[25px] font-bold text-[30px]">
          {sign.split(' ').slice(0, 2).join(' ')}
          <p className="text-gray-500 font-normal">
            {sign.split(' ').slice(2).join(' ')}
          </p>
        </h2>
        <p className="text-gray-600 mt-4 text-[20px] lg:w-[40%]">{subtitle}</p>
      </div>
    </div>
  )
}
