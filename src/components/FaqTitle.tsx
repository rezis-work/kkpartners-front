interface FaqTitleProps {
  title: string
  subtitle: string
}

export default function FaqTitle({ title, subtitle }: FaqTitleProps) {
  return (
    <div className="lg:mt-[50px]">
      <h2 className="text-[38px] font-medium text-black mb-4 leading-[45px] lg:mt-[32px] lg:text-[48px] lg:max-w-[350px] lg:leading-[55px]">
        {title.split(' ')[0]}{' '}
        <span className="inline lg:block text-[grey]">
          {title.split(' ').slice(1).join(' ')}
        </span>
      </h2>
      <p className="text-black text-[18px] leading-[25px] font-normal max-w-[700px] mb-[30px] lg:mb-0 lg:text-[20px]">
        {subtitle}
      </p>
    </div>
  )
}
