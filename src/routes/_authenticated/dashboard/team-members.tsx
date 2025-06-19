import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getPartners } from '@/api/getOurPartners'
import type { Partner, PaginatedResponse } from '@/api/getOurPartners'

export const Route = createFileRoute('/_authenticated/dashboard/team-members')({
  component: Dashboard,
  validateSearch: (search) => {
    return {
      page: Number(search.page) > 0 ? Number(search.page) : 1,
    }
  },
})

function Dashboard() {
  const { page } = useSearch({ from: '/_authenticated/dashboard/team-members' })
  const navigate = useNavigate()
  const currentPage = page || 1
  const itemsPerPage = 5

  const { data, isLoading, isError } = useQuery<PaginatedResponse>({
    queryKey: ['dashboard', currentPage],
    queryFn: () => getPartners(currentPage, itemsPerPage),
    staleTime: 1000 * 60,
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoading && !data)
    return <div className="text-center py-8">Loading...</div>
  if (isError)
    return (
      <div className="text-center text-red-500 py-8">Failed to load team</div>
    )
  if (!data) return null

  const totalPages = Math.ceil(data.total / itemsPerPage)

  const getPaginationNumbers = () => {
    const numbers = []
    const maxVisiblePages = 3

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i)
      }
    } else {
      numbers.push(1)
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(currentPage + 1, totalPages - 1)
      if (start > 2) {
        numbers.push('...')
      }
      for (let i = start; i <= end; i++) {
        numbers.push(i)
      }
      if (end < totalPages - 1) {
        numbers.push('...')
      }
      numbers.push(totalPages)
    }
    return numbers
  }

  const setPage = (newPage: number) => {
    navigate({
      search: { page: newPage } as any,
      replace: false,
    })
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr] bg-gray-100">
      <aside className="hidden md:block bg-[#2f3e47] text-white p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">UBOLD</h1>
        <nav className="space-y-2">
          <div
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => {
              setSidebarOpen(false)
            }}
          >
            <Link to="/dashboard">Home</Link>
          </div>

          <div className="hover:text-gray-300 cursor-pointer">
            <Link to="/dashboard/createPartner">Add Partner</Link>
          </div>
          <div className="hover:text-gray-300 cursor-pointer">
            <Link to="/dashboard/team-members" search={{ page: 1 }}>
              Team-Members
            </Link>
          </div>
          <div className="hover:text-gray-300 cursor-pointer">
            <Link to="/dashboard/clients-page">Clients-Page</Link>
          </div>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="fixed top-0 left-0 w-64 h-full bg-[#2f3e47] text-white p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">UBOLD</h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2">
              <div
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(false)
                }}
              >
                <Link to="/dashboard">Home</Link>
              </div>
              <div
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(false)
                }}
              >
                <Link to="/dashboard/createPartner">Add Partner</Link>
              </div>
              <div
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(false)
                }}
              >
                <Link to="/dashboard/team-members" search={{ page: 1 }}>
                  Team-Members
                </Link>
              </div>
              <div
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(false)
                }}
              >
                <Link to="/dashboard/clients-page">Clients-Page</Link>
              </div>
            </nav>
          </aside>
        </div>
      )}

      <main className="p-4 sm:p-6 bg-white">
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold">Our Partners</h2>
        </div>

        <div className="hidden md:grid grid-cols-4 font-bold text-[#2d2a2a] border-b border-gray-300 pb-2">
          <div>Name</div>
          <div>Position</div>
          <div>Email</div>
          <div>Phone</div>
        </div>

        <div className="space-y-4 mt-4">
          {data.data.map((partner: Partner) => (
            <div
              key={partner._id}
              className="border border-gray-200 rounded-md p-4 bg-white shadow-sm md:shadow-none md:border-0 md:border-b md:grid md:grid-cols-4 md:items-center md:text-sm md:text-[#444]"
            >
              <div className="md:hidden space-y-2 text-sm text-[#333]">
                <div>
                  <span className="font-semibold">Name:</span>{' '}
                  {partner.fullname}
                </div>
                <div>
                  <span className="font-semibold">Position:</span>{' '}
                  {partner.position}
                </div>
                <div className="break-words">
                  <span className="font-semibold">Email:</span>{' '}
                  {partner.contact.email}
                </div>
                <div className="break-words">
                  <span className="font-semibold">Phone:</span>{' '}
                  {partner.contact.phone}
                </div>
              </div>

              <div className="hidden md:block">{partner.fullname}</div>
              <div className="hidden md:block">{partner.position}</div>
              <div className="hidden md:block">{partner.contact.email}</div>
              <div className="hidden md:block">{partner.contact.phone}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            &laquo;
          </button>

          {getPaginationNumbers().map((pageNum, index) =>
            pageNum === '...' ? (
              <span key={`dots-${index}`} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => setPage(Number(pageNum))}
                className={`px-3 py-1 rounded ${
                  pageNum === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageNum}
              </button>
            ),
          )}

          <button
            onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            &raquo;
          </button>
        </div>
      </main>
    </div>
  )
}
