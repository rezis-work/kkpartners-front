import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Layout as LayoutIcon, Menu, X } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: layout,
})

function layout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr] bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block bg-[#2f3e47] text-white p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">UBOLD</h1>
        <nav className="space-y-2">
          <div
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => {
              setSidebarOpen(false)
              navigate({ to: '/' })
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

      {/* Mobile Sidebar */}
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

      {/* Main Content */}
      <main className="p-4 sm:p-6 bg-white">
        {/* Top bar for mobile */}
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
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              Hello Admin 👋
            </h1>
            <p className="text-gray-600 text-md max-w-xl mx-auto">
              Welcome back! You can manage your partners, view team details, and
              stay organized using the sidebar. Let’s build something great
              together.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                Add New Partner
              </h2>
              <p className="text-gray-600">
                Quickly onboard a new team member or collaborator.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                View Dashboard
              </h2>
              <p className="text-gray-600">
                Monitor current partners and overall statistics.
              </p>
            </div>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  )
}
