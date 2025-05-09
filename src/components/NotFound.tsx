import { Link } from '@tanstack/react-router'

function NotFound() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('./public/error-page-bg-picture.png')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}
        className="w-full bg-[rgb(247,243,239)] px-11 py-[200px] flex flex-col items-start lg:px-[200px]"
      >
        <h1 style={{ lineHeight: '1em' }} className="text-[48px]">
          404 <span className="text-[rgba(41,22,22,.5)]">Error Page</span>
        </h1>
        <p className="mt-[24px] text-[15px] lg:max-w-[375px]">
          The page you are looking for doesn't exist. It may have been moved or
          removed altogether. Please try searching for some other page, or
          return to the website's homepage to find what you're looking for.
        </p>
        <Link to="/">
          <button className="bg-[#291616] text-white px-6 py-3 font-semibold text-[15px] cursor-pointer hover:underline mt-12">
            Back to home
          </button>
        </Link>
      </div>
    </>
  )
}

export default NotFound
