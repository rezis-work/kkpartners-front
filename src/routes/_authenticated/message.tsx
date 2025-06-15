import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import getMessages from '@/hooks/getUsersMessages'

export const Route = createFileRoute('/_authenticated/message')({
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
      <div className="min-h-screen md:grid md:grid-cols-[240px_1fr] bg-gray-100">
        <aside className="hidden md:block bg-[#2f3e47] text-white p-6 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">UBOLD</h1>
          <nav className="space-y-2">
            <div className="hover:text-gray-300 cursor-pointer">Tables</div>
            <div className="hover:text-gray-300 cursor-pointer">Law</div>
            <Link to="/message">message</Link>
          </nav>
        </aside>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Messages</h2>
          <div className="space-y-4">
            {data.contacts.map((user: UserInfo, index: number) => {
              return (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium"></h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{user.message}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
