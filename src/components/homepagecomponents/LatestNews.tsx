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

interface LatestNewsBlogsProps {
  title?: string
  className?: string
  limit?: number
  layout?: 'grid' | 'vertical'
  width?: string
}

function LatestNewsBlogs({
  title = 'Latest News Coming',
  className = '',
  limit,
  layout = 'grid',
  width = 'w-full',
}: LatestNewsBlogsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: LatestBlogs,
  })

  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  const limitedData = limit ? data.slice(0, limit) : data

  return (
    <div className={`w-full ${className}`}>
      <h2 className="pt-10 text-2xl font-bold text-black">{title}</h2>

      <section
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-10 py-8'
        }
      >
        {limitedData.map((blogs: Blog, index: number) => (
          <div key={index} className="px-4">
            <img
              className={
                width === 'w-full'
                  ? 'w-full h-auto rounded-md object-cover'
                  : 'w-[200px] h-full rounded-md object-cover'
              }
              src={
                blogs.images ||
                'https://www.vecteezy.com/free-vector/default-user'
              }
              alt={blogs._id}
            />
            <div className="text-gray-800 mt-4">
              <h4 className="font-semibold">{blogs.author}</h4>
              <h3 className="text-lg">{blogs.subTitle}</h3>
              <h1 className="text-xl font-bold">{blogs.title}</h1>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default LatestNewsBlogs
