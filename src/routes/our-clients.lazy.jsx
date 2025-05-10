// 380-680px ერთი სვეტი,1024px-1200px ოთხი სვეტი, 1200px-დან 5 სვეტი

import { createLazyFileRoute } from '@tanstack/react-router'
import HeaderMain from '@/components/header/HeaderMain'
import FooterComponent from '@/components/Footer'
import { useQuery } from '@tanstack/react-query'
import { getClients } from '@/api/getClients'
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

  console.log(data)

  return (
    <>
      <div className="w-screen bg-[#041E22]">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <div
          style={{
            backgroundImage: `url(./public/our-clients-bg-img.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="min-h-[460px]"
        ></div>
        <div className="w-full px-6  mb-[60px]">
          <p className="mt-[58px] mb-[48px] text-[38px] font-medium text-white">
            For others is business,{' '}
            <span className="opacity-[0.43]">for us is personal</span>
          </p>
          {data &&
            data.map((card, index) => (
              <div
                key={index}
                style={{ border: '1px solid rgba(255,255,255,.15)' }}
                className="w-full h-[382px] flex items-center justify-center"
              >
                <img className="w-[170px]" src={card.icon} />
              </div>
            ))}
        </div>

        <FooterComponent />
      </div>
    </>
  )
}
