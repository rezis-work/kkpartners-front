
export default function FaqSkeleton() {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-300 rounded"></div> {/* Title skeleton */}
          <div className="h-10 w-32 bg-gray-300 rounded"></div> {/* Button skeleton */}
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr>
              <th className="py-3 px-4">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </th>
              <th className="py-3 px-4">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </th>
              <th className="py-3 px-4">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="py-4 px-4">
                  <div className="h-5 bg-gray-300 rounded w-48"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-5 bg-gray-300 rounded w-64"></div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="h-6 w-20 bg-gray-300 rounded mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  