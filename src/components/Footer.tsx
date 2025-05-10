import { Link } from '@tanstack/react-router'
import TopLinks from './FooterComponent/Footer_Top'
import FooterMidle from './FooterComponent/footer-middle'
import EmailSend from './EmailSend'
import FooterBottom from './FooterComponent/Footer_bottom'

function FooterComponent() {
  return (
    <footer className="Footer">
      <div className="bg-[#291616] w-full flex items-start justify-start p-4">
        <div className="w-full p-6 flex flex-col lg:flex-row items-start text-start md:items-start justify-between gap-6">
          {/* Links container aligned left */}
          <div className=" flex flex-col md:flex-row space-x-0 md:space-x-6 order-1 w-full md:w-auto justify-start md:justify-start mb-4 md:mb-0">
            {TopLinks.map((TopItems, index) => (
              <Link key={index} to={TopItems.Link} className="text-white">
                <span className="w-fit border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500 cursor-pointer ">
                  {TopItems.name}
                </span>
              </Link>
            ))}
          </div>
          {/* Contact info container aligned right */}
          <div className="flex flex-col lg:flex-row justify-start md:justify-end items-start text-white order-2 w-full md:w-auto space-y-2 md:space-y-0 md:space-x-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-4 h-5"
                src="../../public/footerimage/tel.png"
                alt="Tel icon"
              />
              <span className="border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500">
                + 123 456 789 000
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-4 h-5"
                src="../../public/footerimage/email-box.png"
                alt="Email icon"
              />
              <span className="border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500">
                dictum@example.com
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#4B2524] text-white">
        <div className="grid gap-9 pl-22 pr-2 pb-25 pt-25  lg:flex items-start  lg:pl-22 lg:pr-75 lg:pb-25 lg:pt-25">
          <div className="w-full ">
            <Link to="/" className="DCTM-a">
              <img
                src="../../public/footerimage/logo-light.png "
                alt="DCTM"
                className="w-50"
              />
            </Link>
          </div>
          <h4 className="text-2xl h-full text-start flex ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </h4>
        </div>

        <div className=" grid grid-cols-1 px-7 gap-4.5 md:grid md:grid-cols-2 xl:flex w-full pl-22 pr-10 pb-25 pt-11 items-center  ">
          <EmailSend />
          <FooterMidle />
        </div>
        {/* last part of footer */}
        <div className="w-full">
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
