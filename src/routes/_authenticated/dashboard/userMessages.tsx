import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import getMessages from '@/hooks/getUsersMessages'

export const Route = createFileRoute('/_authenticated/dashboard/userMessages')({
  component: RouteComponent,
})

interface UserInfo {
  name: string
  email: string
  message: string
}

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['contact'],
    queryFn: getMessages,
  })

  if (isLoading) {
    return <div>Loadingg ...</div>
  }

  if (!data || data.length === 0) {
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">📨 Messages</h2>
            <Link to="/dashboard">
              <button className="inline-block bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition cursor-pointer">
                Back to Dashboard
              </button>
            </Link>
          </div>

          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
            {data.contacts.length === 0 ? (
              <p className="text-gray-500 text-center">No messages found.</p>
            ) : (
              data.contacts.map((user: UserInfo, index: number) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {user.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
