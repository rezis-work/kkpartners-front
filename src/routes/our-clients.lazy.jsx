import { createLazyFileRoute } from '@tanstack/react-router'
import HeaderMain from '@/components/header/HeaderMain'
import { useQuery } from '@tanstack/react-query'
import { getClients } from '@/api/getClients'
import '../globalStyles.css'
import FooterComponent from '@/components/Footer'
export const Route = createLazyFileRoute('/our-clients')({
  component: RouteComponent,
})
function RouteComponent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data || !Array.isArray(data)) return <div>No data available</div>

  return (
    <>
      <div className="w-screen bg-[#041E22]">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="rgba(0,0,0,0.1)"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <div
          style={{
            backgroundImage: `url(./public/images/our-clients-bg-img.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="min-h-[460px]"
        ></div>
        <div className="w-full px-6  pb-[60px] md:px-9 lg:px-10 xl:px-17 xl:pb-[120px]">
          <p className="mt-[58px] mb-[48px] text-[38px] font-medium text-white max-w-[300px]">
            For others is business,{' '}
            <span className="opacity-[0.43]">for us is personal</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {data &&
              data.map((card, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid rgba(255,255,255,.15)',
                  }}
                  className="card-container w-full relative h-[340px] flex items-center justify-center overflow-hidden"
                >
                  <img
                    className="card-bg-img w-full h-full absolute left-0 top-0"
                    src={card.image}
                  />
                  <img className="w-[170px] absolute z-10" src={card.icon} />
                </div>
              ))}
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  )
}
