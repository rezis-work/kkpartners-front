import { useQuery } from '@tanstack/react-query'
import { getHomePartners } from '../../api/getHomePartners'

const HomeTeam = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['homePartners'],
    queryFn: getHomePartners,
  })

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (isError)
    return (
      <div className="text-center text-red-500 py-8">Failed to load team</div>
    )
  if (!data) {
    return null
  }

  return (
    <div className="bg-[#f7f2ec] py-20 px-4 md:px-8">
      <div className="max-w-[1280px] xl:max-w-[1600px] 2xl:max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="mb-12 text-center lg:text-left lg:w-1/3">
            <h2 className="text-[30px] md:text-[35px] font-semibold text-[#2d2a2a] mb-3">
              Partners & associates
            </h2>
            <p className="text-[#4a4a4a] text-[16px] md:text-[18px] max-w-[600px] mx-auto lg:mx-0 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-[#2d2a2a] underline hover:text-[#6e6e6e] transition duration-200"
            >
              Join Our Team →
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-2/3">
            {data.map((partner) => (
              <div key={partner._id} className="text-center">
                <div className="overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.fullname}
                    className="w-full h-[320px] object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#2d2a2a]">
                  {partner.fullname}
                </h3>
                <p className="text-[#6b6b6b] text-sm">{partner.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeTeam
