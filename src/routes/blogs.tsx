import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaTwitter,
} from 'react-icons/fa'
import HeaderMain from '@/components/header/HeaderMain'

import getBlogs from '@/hooks/blogs/getBlogs'

import FooterComponent from '@/components/Footer'
import ScrollButt from '@/components/scrollButt'

export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      page: Number(search.page) || 1,
    }
  },
})

interface Blog {
  _id: string
  title: string
  subTitle: string
  slug: string
  content: string
  images: Array<string>
  category: string
  tags: Array<string>
  author: string
  share: {
    facebook: string
    linkedin: string
    x: string
    instagram: string
  }
}

function RouteComponent() {
  const navigate = useNavigate()
  const { page } = Route.useSearch()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', page],
    queryFn: () => getBlogs(page),
  })

  const setPage = (newPage: number) => {
    navigate({ search: { page: newPage } })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full py-10">
        <svg
          className="animate-spin h-8 w-8 text-blue-600 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-blue-600 text-lg font-medium">Loading...</span>
      </div>
    )
  }

  if (isError) {
    throw new Error(
      `Something went wrong in BlogsMain page: ${error instanceof Error ? error.message : ''}`,
    )
  }

  if (!data) {
    return null
  }
  return (
    <div className="w-full h-full" id="blogsMain">
      {/* Header */}
      <div className="w-full z-10">
        <HeaderMain
          bgColor="transparent"
          darkOrLight="light"
          iconColor="light"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
      </div>
      {/* Banner Image */}
      <img
        src="/public/images/coming-soon.jpg"
        alt=""
        className="h-[600px] w-full object-cover"
      />
      {/* Layout */}
      <div className="w-full pt-20 px-6 grid grid-cols-1 lg:grid-cols-10 gap-10 pb-10 lg:px-20">
        {/* LEFT: Blogs */}
        <div className="col-span-7 space-y-10">
          {data.data.map((blogs: Blog, index: number) => {
            return (
              <>
                <Link key={index} to="/blogsId/$id" params={{ id: blogs.slug }}>
                  <div className="space-y-4 pb-10">
                    {/* Show first image if exists */}
                    {blogs.images.length > 0 && (
                      <img
                        className="w-full object-cover rounded-md"
                        src={blogs.images[0]}
                        alt={blogs.title}
                      />
                    )}
                    {/* Blog Info */}
                    <div className="flex gap-3 text-lg text-gray-600">
                      <span>{blogs.author}</span>
                      <span>{blogs.slug}</span>
                      <span>{blogs.category}</span>
                    </div>
                    <h2 className="text-4xl font-bold">{blogs.subTitle}</h2>
                    <p className="text-lg text-gray-800">{blogs.content}</p>
                    {/* Read more & Share */}
                  </div>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6">
                  <Link
                    to="/"
                    className="text-xl font-semibold hover:underline underline-offset-4"
                  >
                    Read More
                  </Link>

                  <div className="relative group mt-4 md:mt-0">
                    <div className="relative group inline-block">
                      <h1 className="text-lg font-bold cursor-pointer">
                        Share
                      </h1>

                      <div
                        className="absolute top-1/2 -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300
             left-full pl-2
             md:left-auto md:right-full md:pr-2"
                      >
                        <a
                          href={blogs.share.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:scale-110 transition-transform"
                        >
                          <FaFacebookF size={20} />
                        </a>
                        <a
                          href={blogs.share.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:scale-110 transition-transform"
                        >
                          <FaTwitter size={20} />
                        </a>
                        <a
                          href={blogs.share.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:scale-110 transition-transform"
                        >
                          <FaLinkedinIn size={20} />
                        </a>
                        <a
                          href={blogs.share.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:scale-110 transition-transform"
                        >
                          <FaInstagram size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
          <div className="flex justify-center gap-4 pt-6">
            <button
              className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{page}</span>
            <button
              className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setPage(page + 1)}
              disabled={page >= data.totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-span-3 space-y-10">
          {/* Search */}
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search blog..."
              className="w-full text-black border-0 border-b border-black focus:outline-none focus:border-black transition-all pr-10 py- sm:w-1/2"
            />
            <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-black sm:w-8/8" />
          </div>

          {/* Categories */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Categories</h2>
            {[
              ...(new Set(
                data.data.map((blog: Blog) => blog.category),
              ) as unknown as Array<string>),
            ].map((category, index: number) => (
              <Link to="/">
                <div key={index} className="text-lg text-gray-700">
                  <h1 className="flex font-semibold hover:underline underline-offset-4 cursor-pointer">
                    {category}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl pt-1 pb-4">Tags</h1>
            {[
              ...(new Set(
                data.data.map((blog: Blog) => blog.tags),
              ) as unknown as Array<string>),
            ].map((tags, index: number) => (
              <Link to="/">
                <div key={index} className="text-lg text-gray-700 flex">
                  <h1 className="flex font-semibold hover:underline underline-offset-4 cursor-pointer">
                    {tags}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <FooterComponent />
      <ScrollButt id="blogsMain" />
    </div>
  )
}
