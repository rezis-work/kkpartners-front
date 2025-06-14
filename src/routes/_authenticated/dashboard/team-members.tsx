import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getPartners } from '@/api/getOurPartners'

export const Route = createFileRoute('/_authenticated/dashboard/team-members')({
  component: Dashboard,
})

function Dashboard() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getPartners,
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (isError)
    return (
      <div className="text-center text-red-500 py-8">Failed to load team</div>
    )
  if (!data) return null

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr] bg-gray-100">
      <aside className="hidden md:block bg-[#2f3e47] text-white p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">UBOLD</h1>
        <nav className="space-y-2">
          <div
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => {
              setSidebarOpen(false)
              navigate({ to: '/dashboard' })
            }}
          >
            Home
          </div>
          <div className="hover:text-gray-300 cursor-pointer">Law</div>
          <div
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => navigate({ to: '/create-partner' })}
          >
            Add Partner
          </div>
          <div
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => navigate({ to: '/dashboard' })}
          >
            Dashboard
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
                  navigate({ to: '/layout' })
                }}
              >
                Home
              </div>
              <div className="hover:text-gray-300 cursor-pointer">Law</div>
              <div
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(false)
                  navigate({ to: '/createPartner' })
                }}
              >
                Add Partner
              </div>
              <div
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(false)
                  navigate({ to: '/dashboard' })
                }}
              >
                Dashboard
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
          {paginatedData.map((partner) => (
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

        <div className="flex justify-center items-center mt-6 flex-wrap gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            &laquo;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
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
