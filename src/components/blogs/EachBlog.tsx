import HeaderMain from '../header/HeaderMain'
import CommentsForBlog from './commentsForBlog'

import type { BlogProps } from '@/types'

interface SingleBlogs {
  slags: BlogProps
}

export default function EachBlog({ slags }: SingleBlogs) {
  return (
    <div className="w-full h-full ">
      <div className="w-full z-10">
        <HeaderMain
          bgColor="transparent"
          darkOrLight="dark"
          iconColor="dark"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="black"
          desktopHeaderBgColor2="transparent"
        />
      </div>
      <div className="max-w-3xl mx-auto p-4 pt-50">
        <h1 className="text-3xl font-bold mb-4">{slags.title}</h1>
        <p className="text-gray-600 mb-2">{slags.subTitle}</p>
        <div className="mb-6">
          {slags.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Blog image ${index + 1}`}
              className="w-full h-auto mb-4"
            />
          ))}
        </div>
        <div className="prose">
          <p>{slags.content}</p>
        </div>
        <div className="mt-6 ">
          <h2 className="text-xl font-semibold pt-2">
            Author:
            <span className="text-xl font-bold px-5">{slags.author}</span>
          </h2>
          <p className="text-xl font-bold pt-2">
            Category:
            <span className="font-medium text-lg px-5">{slags.category}</span>
          </p>
          <p className="text-xl font-bold pt-2">
            Tags:
            <span className="font-medium px-5 text-lg">
              {slags.tags.join(', ')}
            </span>
          </p>
        </div>
      </div>
      <CommentsForBlog blogId={slags._id} />
    </div>
  )
}
