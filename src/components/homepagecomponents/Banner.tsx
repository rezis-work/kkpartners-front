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
    <section className="w-full bg-[#F9F5F0] px-10 py-20 xl:flex gap-10">
      {/* Left Section */}
      <div className="w-full xl:w-1/3">
        <h3 className="text-3xl font-semibold mb-6">
          Contributing important global initiatives
        </h3>
        <p className="text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Right Section - Banner Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 xl:mt-0">
        {data.map((banner: Banner, index: number) => (
          <div
            key={index}
            className="relative w-full h-80 rounded-xl overflow-hidden group"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {index === 0 && (
              <div className="absolute top-4 left-5 z-20 text-white text-6xl font-extrabold opacity-30 select-none pointer-events-none md:text-8xl">
                {banner.revenue}
              </div>
            )}

            {/* Title */}
            <div className="absolute bottom-16 left-6 z-20">
              <h4 className="text-white text-xl md:text-2xl font-medium drop-shadow-lg max-w-[80%]">
                {banner.title}
              </h4>
            </div>

            {/* Link */}
            <Link to="/what-we-do" className="absolute bottom-6 left-6 z-20">
              <p className="text-white text-base underline underline-offset-4 group-hover:opacity-90 transition-all">
                Visit →
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Banners
