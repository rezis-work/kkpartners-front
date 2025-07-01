import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import React, { useState, useMemo, useCallback } from 'react'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaTwitter,
  FaTimes,
} from 'react-icons/fa'
import HeaderMain from '@/components/header/HeaderMain'

import getBlogs, { getAllTags } from '@/hooks/blogs/getBlogs'

import FooterComponent from '@/components/Footer'
import ScrollButt from '@/components/scrollButt'
import LatestNewsBlogs from '@/components/homepagecomponents/LatestNews'

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
  const { page: urlPage } = Route.useSearch()
  const [currentPage, setCurrentPage] = useState(urlPage || 1)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  // Build search parameters for the API call - this is what gets sent to the server
  const searchParams = useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: 10, // You can adjust this
    }

    // Only add non-empty parameters to avoid sending empty strings
    if (searchTerm.trim()) {
      params.search = searchTerm.trim()
    }
    if (selectedCategory) {
      params.category = selectedCategory
    }
    if (selectedTag) {
      params.tags = selectedTag
    }

    console.log('Search params being sent to server:', params)
    return params
  }, [currentPage, searchTerm, selectedCategory, selectedTag])

  // Main blogs query - this fetches filtered data from the server
  const {
    data: blogsData,
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsErrorData,
  } = useQuery({
    queryKey: ['blogs', searchParams],
    queryFn: () => getBlogs(searchParams),
    enabled: true,
    refetchOnWindowFocus: false,
  })

  // Tags query - fetches all available tags
  const { data: tagsData, isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getAllTags,
  })

  // Categories query - extracts unique categories from blogs data
  const categories = useMemo(() => {
    if (!blogsData?.data) return []
    const uniqueCategories = [
      ...new Set(blogsData.data.map((blog: Blog) => blog.category)),
    ]
    return uniqueCategories.filter((category): category is string =>
      Boolean(category),
    ) // Remove empty categories and ensure type safety
  }, [blogsData?.data])

  console.log('Current search params:', searchParams)
  console.log('Blogs data:', blogsData)
  console.log('Tags data:', tagsData)
  console.log('Categories:', categories)

  const setPage = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = useCallback(() => {
    console.log('Search button clicked! Input value:', searchInput)
    const trimmedInput = searchInput.trim()

    setSearchLoading(true)

    // Update search term - this will trigger useQuery to refetch
    setSearchTerm(trimmedInput)

    // Reset to page 1 when searching
    if (currentPage !== 1) {
      setPage(1)
    }

    // Reset loading state immediately
    setSearchLoading(false)
  }, [searchInput, currentPage])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? '' : category
    setSelectedCategory(newCategory)
    setSelectedTag('') // Clear tag filter when category is selected
    // Reset to page 1 when filtering
    if (currentPage !== 1) {
      setPage(1)
    }
  }

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? '' : tag
    setSelectedTag(newTag)
    setSelectedCategory('') // Clear category filter when tag is selected
    // Reset to page 1 when filtering
    if (currentPage !== 1) {
      setPage(1)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedTag('')
    setSearchInput('')
    // Reset to page 1 when clearing filters
    if (currentPage !== 1) {
      setPage(1)
    }
  }

  // Loading state
  if (blogsLoading) {
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
        <span className="text-blue-600 text-lg font-medium">
          Loading blogs...
        </span>
      </div>
    )
  }

  // Error state
  if (blogsError) {
    throw new Error(
      `Something went wrong in BlogsMain page: ${blogsErrorData instanceof Error ? blogsErrorData.message : ''}`,
    )
  }

  if (!blogsData) {
    return null
  }

  const blogs = blogsData.data
  const totalPages = blogsData.totalPages || 1
  const total = blogsData.total || 0

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
        alt="coming soon"
        className="h-[600px] w-full object-cover"
      />
      {/* Layout */}
      <div className="w-full pt-20 px-6 grid grid-cols-1 lg:grid-cols-10 gap-10 pb-10 lg:px-20">
        {/* LEFT: Blogs */}
        <div className="col-span-7 space-y-10">
          {/* Results counter */}
          {(searchTerm || selectedCategory || selectedTag) && (
            <div className="text-sm text-gray-600 mb-4">
              Found {total} blog{total !== 1 ? 's' : ''}
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </div>
          )}

          {/* Blog Results */}
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                {searchTerm || selectedCategory || selectedTag
                  ? 'No blogs found'
                  : 'No blogs available'}
              </h2>
              <p className="text-gray-500 mb-6">
                {searchTerm && `No blogs found for "${searchTerm}"`}
                {selectedCategory &&
                  `No blogs found in category "${selectedCategory}"`}
                {selectedTag && `No blogs found with tag "${selectedTag}"`}
                {!searchTerm &&
                  !selectedCategory &&
                  !selectedTag &&
                  'There are no blogs published yet.'}
              </p>
              {(searchTerm || selectedCategory || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            blogs.map((blog: Blog, index: number) => {
              return (
                <React.Fragment key={blog._id || index}>
                  <a href={`/blogsId/${blog.slug}`}>
                    <div className="space-y-4 pb-10">
                      {/* Show first image if exists */}
                      {blog.images && blog.images.length > 0 && (
                        <img
                          className="w-full object-cover rounded-md"
                          src={blog.images[0]}
                          alt={blog.title}
                        />
                      )}
                      {/* Blog Info */}
                      <div className="flex gap-3 text-lg text-gray-600">
                        <span>{blog.author}</span>
                        <span>{blog.slug}</span>
                        <span>{blog.category}</span>
                      </div>
                      <h2 className="text-4xl font-bold">{blog.subTitle}</h2>
                      <p className="text-lg text-gray-800">{blog.content}</p>
                    </div>
                  </a>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6">
                    <a
                      href={`/blogsId/${blog.slug}`}
                      className="text-xl font-semibold hover:underline underline-offset-4"
                    >
                      Read More
                    </a>

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
                            href={blog.share.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:scale-110 transition-transform"
                          >
                            <FaFacebookF size={20} />
                          </a>
                          <a
                            href={blog.share.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:scale-110 transition-transform"
                          >
                            <FaTwitter size={20} />
                          </a>
                          <a
                            href={blog.share.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:scale-110 transition-transform"
                          >
                            <FaLinkedinIn size={20} />
                          </a>
                          <a
                            href={blog.share.instagram}
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
                </React.Fragment>
              )
            })
          )}

          {/* Pagination - only show if there are results */}
          {blogs.length > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-4 pt-6">
              <button
                className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="col-span-3 space-y-10">
          {/* Search */}
          <div className="relative w-full flex items-center">
            <input
              type="search"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search blog..."
              disabled={searchLoading}
              className="w-full text-black border-0 border-b border-black focus:outline-none focus:border-black transition-all pr-10 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ height: '44px' }}
              aria-label="Search blogs"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searchLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ height: '36px' }}
            >
              {searchLoading ? (
                <svg
                  className="animate-spin h-4 w-4"
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
              ) : (
                <FaSearch size={14} />
              )}
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || selectedCategory || selectedTag) && (
            <div className="flex justify-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory || selectedTag) && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Active Filters:</h3>
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    Search: "{searchTerm}"
                  </span>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSearchInput('')
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              {selectedCategory && (
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Category: {selectedCategory}
                  </span>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              {selectedTag && (
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Tag: {selectedTag}
                  </span>
                  <button
                    onClick={() => setSelectedTag('')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Categories */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Categories</h2>
            {categories.length > 0 ? (
              categories.map((category, index: number) => (
                <div key={index} className="text-lg text-gray-700">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`flex font-semibold hover:underline underline-offset-4 cursor-pointer transition-all ${
                      selectedCategory === category
                        ? 'text-blue-600 underline'
                        : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                No categories available
              </div>
            )}
          </div>
<<<<<<< HEAD

          {/* Tags */}
=======
          <Link to="/">
            <LatestNewsBlogs limit={3} layout="vertical" width="100px" />
          </Link>
>>>>>>> 973e830c4861ab30c5b6c2db7eefdb24ceb99f99
          <div className="space-y-1">
            <h1 className="text-4xl pt-1 pb-4">Tags</h1>
            {tagsLoading ? (
              <div className="flex items-center justify-center py-4">
                <svg
                  className="animate-spin h-6 w-6 text-blue-600 mr-2"
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
                <span className="text-gray-600">Loading tags...</span>
              </div>
            ) : tagsData?.data ? (
              <div className="flex flex-wrap gap-2">
                {tagsData.data.map((tag: string, index: number) => {
                  // Count how many blogs have this tag from the current filtered results
                  const tagCount = blogs.filter(
                    (blog: Blog) => blog.tags && blog.tags.includes(tag),
                  ).length

                  return (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        selectedTag === tag
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={`${tagCount} blog${tagCount !== 1 ? 's' : ''} with this tag`}
                    >
                      {tag}
                      {tagCount > 0 && (
                        <span
                          className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                            selectedTag === tag
                              ? 'bg-white text-green-600'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {tagCount}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-4">
                No tags available
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterComponent />
      <ScrollButt id="blogsMain" />
    </div>
  )
}
