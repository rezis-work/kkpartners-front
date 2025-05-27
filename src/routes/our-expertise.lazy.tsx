import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import HeaderMain from '@/components/header/HeaderMain'
import Experts from '@/hooks/experts'

export const Route = createLazyFileRoute('/our-expertise')({
  component: RouteComponent,
})

interface ExpertsData {
  _id: string
  fullname: string
  position: string
  about: string
  biography: string
  image: string
  cover: string
  contact: {
    linkedin: string
    phone: string
    email: string
  }
  services: [string]
}

function RouteComponent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['experties'],
    queryFn: Experts,
  })

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }
  if (isError) {
    return <div>erroer from usquery {error.message}</div>
  }

  return (
    <>
      <div className="bg-[#041D21] w-full h-full ">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <div id="content" className="pt-50 pb-15 text-white">
          <h2 className="text-5xl flex justify-center py-10">
            Team of experts
          </h2>
          <p className="flex justify-center pt-5 text-lg py-5">
            Lorem ipsum dolor sit amet
          </p>

          {data.map((experts: ExpertsData, _id: number) => {
            return (
              <div
                key={_id}
                className="flex flex-col items-center w-full lg:w-auto lg:flex-row mb-4"
              >
                <div className="flex justify-center lg:justify-start w-full lg:w-1/2 ">
                  <img
                    src={experts.image}
                    alt=""
                    className="w-full h-auto px-15 py-10 bg-cover lg:w-3/4 lg:h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center text-left w-full lg:w-1/2 h-full p-4 px-15 py-10 gap-1.5 lg:order-first">
                  <h3 className="text-4xl font-bold">{experts.fullname}</h3>
                  <h4 className="text-lg ">{experts.position}</h4>
                  <h5 className="text-md w-3/4 pt-10">{experts.about}</h5>

                  <Link
                    to={experts.cover}
                    className="text-white hover:underline pt-10"
                  >
                    <p>Linked In</p>
                  </Link>
                  <p>call +123 456 789</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
