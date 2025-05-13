interface FaqTitleProps {
  title: string
  subtitle: string
}

export default function FaqTitle({ title, subtitle }: FaqTitleProps) {
  return (
    <div className="lg:mt-[50px]">
      <h2 className="text-[27px] md:text-[35px] lg:text-[35px] lg:font-bold">
        {title.split(' ')[0]}{' '}
        <span className="inline lg:block text-[grey]">
          {title.split(' ').slice(1).join(' ')}
        </span>
      </h2>
      <p className="mt-[25px] text-[19px] md:text-[33px] lg:text-[25px]">
        {subtitle}
      </p>
    </div>
  )
}
