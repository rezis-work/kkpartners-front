import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import FetchBanners from '../../hooks/banners'

export interface Banner {
  title: string
  link: string
  image: string
  revenue: string
}

function Banners() {
  const { isLoading, isError, error, data } = useQuery<Array<Banner>>({
    queryKey: ['banners'],
    queryFn: FetchBanners,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data) return <div>no data found</div>

  return (
    <section className="w-full bg-[#F9F5F0] grid grid-cols-1 pl-10 pr-10 pb-15  xl:flex gap-10 pt-15  ">
      <div className=" w-full xl:w-1/3 p">
        <h3 className="pt-20 text-3xl ">
          Contributing important global initiatives
        </h3>
        <p className=" w-full pr-0 sm:w-[80%] lg:flex items-center  text-xl lg:pr-20 pt-7  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((banner: Banner, index: number) => (
          <div
            key={index}
            className="relative w-full h-100 overflow-hidden rounded-xl group"
          >
            {/* Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />

            {/* Title */}

            <div className="absolute inset-0 flex items-end justify-start pb-20 pl-6">
              <h4 className="text-white text-xl md:text-2xl font-medium drop-shadow-lg max-w-[70%]">
                {banner.title}
              </h4>
            </div>

            {/* Link bottom-left */}
            <Link
              to={banner.link}
              className="absolute bottom-6 left-6 text-2xl"
            >
              <p className="text-white underline-offset-4 group-hover:underline transition drop-shadow">
                Visit →
              </p>
            </Link>

            {/* Revenue მხოლოდ პირველ ბანერზე */}
            {index === 0 && (
              <div className="absolute top-4 left-5 text-white text-6xl items-start font-extrabold opacity-30 select-none pointer-events-none md:absolute md:top-4 md:left-5 md:text-8xl md:items-start md:font-extrabold md:opacity-30 md:select-none md:pointer-events-none">
                {banner.revenue}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Banners
