import { createFileRoute } from '@tanstack/react-router'
import type { BlogProps } from '@/types'

import { blogsSlag } from '@/hooks/blogs/blogs'
import EachBlog from '@/components/blogs/EachBlog'

export const Route = createFileRoute('/blogsId/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const res = await blogsSlag(params.id)
    return { slags: res.data }
  },
})

function RouteComponent() {
  const { slags }: { slags: BlogProps } = Route.useLoaderData()
  console.log(slags)
  return <EachBlog slags={slags} />
}
