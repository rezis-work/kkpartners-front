import { Link } from '@tanstack/react-router'

function FooterBottom() {
  return (
    <>
      <div className="w-full pb-20">
        <div className="w-full cursor-pointer p-7 md:flex md:justify-end md:space-x-15 pr-14">
          <p className="w-fit border-b border-transparent hover:border-white transition ease-in-out duration-1500">
            Terms and Conditions
          </p>
          <p className="w-fit border-b border-transparent hover:border-white transition ease-in-out duration-1500">
            Privacy Policy
          </p>
          <p className="w-fit text-start">
            © 2025{' '}
            <Link
              to="/"
              className="border-b border-transparent hover:border-white transition ease-in-out duration-150"
            >
              Qode Interactive
            </Link>
            , All Rights Reserved
          </p>
        </div>
      </div>
    </>
  )
}
export default FooterBottom
