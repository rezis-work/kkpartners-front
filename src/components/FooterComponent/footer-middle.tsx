import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function FooterMidle() {
  return (
    <>
      <div className=" grid grid-cols-1 w-full items-center xl:pl-10">
        <h3 className="text-2xl flex items-start ">Start A Conversation</h3>
        <p className=" w-fit border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500 cursor-pointer">
          <span className=" w-fit">dictum@example.com</span>
        </p>
        <span className="flex  w-fit border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500 cursor-pointer">
          <span className="w-fit flex justify-center items-center m-auto">
            +123 456 789 000
          </span>
        </span>
      </div>

      {/* LOACTION PART */}
      <div
        className="w-full
      "
      >
        <h3 className="text-2xl flex ">Find Our Location</h3>
        <div className="w-full cursor-pointer">
          <span className=" w-fit text-start flex border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500 cursor-pointer">
            Old Westbury 256, New York 11201,
          </span>
          <span className="w-fit text-start flex border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500 cursor-pointer">
            United States America
          </span>
          <p className="w-fit text-start border-b-1 border-transparent hover:border-white transition ease-in-out duration-1500 cursor-pointer">
            650 Birmingham street, London 3000,Uk
          </p>
        </div>
      </div>

      {/* socials part */}
      <div className="w-full">
        <h3 className="text-2xl flex">Our Socials</h3>
        <div className="flex gap-4 mt-4 cursor-pointer ">
          {/* facebook icon */}
          <FaFacebookF />
          {/* x- icon */}
          <FaXTwitter />
          {/* linkedin- icon */}
          <FaLinkedinIn />
          {/* p- icons */}
          <FaPinterestP />
        </div>
      </div>
    </>
  )
}

export default FooterMidle
