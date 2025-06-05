export default function PartnerSkeleton() { 
  
    return (
      <div className="w-screen min-h-screen p-10 bg-gray-100">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-12 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-10"></div>
  
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  
              <div className="h-6 bg-gray-300 rounded w-1/2 mt-10"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
  
            <div className="w-full md:w-1/3 h-[450px] bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  