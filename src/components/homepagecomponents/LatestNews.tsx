import { useQuery } from '@tanstack/react-query'
import LatestBlogs from '../../hooks/latestBlogs'

interface Blog {
  share: {
    facebook: string
    linkedin: string
    x: string
    instagram: string
  }
  _id?: string
  title: string
  subTitle: string
  slug: string
  content: string
  images: string
  category: string
  tags: [string, string]
  author: string
  lawWays: string
  createdAt: number
  updatedAt: number
  __v: number
}

function LatestNewsBlogs() {
  const { data, isLoading } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: LatestBlogs,
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    return null
  }

  return (
    <div className="bg-[#4B2524] w-full">
      <h2 className="pt-15 text-white text-4xl flex justify-center">
        Latest News Comming
      </h2>

      <section className="grid grid-cols-1 py-15 md:grid-cols-2 lg:grid-cols-3">
        {data.map((blogs: Blog, _id: number) => {
          return (
            <div key={_id} className="px-10 py-10 ">
              {blogs.images ? (
                <img
                  className="mt-auto flex justify-center w-full"
                  src={blogs.images}
                  alt={blogs._id}
                />
              ) : (
                <img
                  className="mt-auto flex justify-center w-full"
                  src="https://www.vecteezy.com/free-vector/default-user"
                  alt={blogs._id}
                />
              )}

              <div id="content" className="flex gap-5 text-white px-5 py-5">
                <h4 className="text-white ">{blogs.author}</h4>
                <h3>{blogs.subTitle}</h3>
              </div>
              <h1 className="text-white text-xl px-5 w-full">{blogs.title}</h1>
            </div>
          )
        })}
      </section>
    </div>
  )
}
export default LatestNewsBlogs
