import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/auth' // იმპორტი თქვენი useAuth ფუნქციისთვის

export const Route = createFileRoute('/auth')({
  component: Auth,
})

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const mutation = useMutation<
    unknown,
    Error,
    { email: string; password: string }
  >({
    mutationFn: (data) => useAuth(data.email, data.password),
    onSuccess: (data) => {
      navigate({
        to: '/dashboard',
      })
    },
    onError: (error) => {
      console.error('Login failed:', error.message)
      toast.error('Something went wrong, try again.')
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[30%_70%]">
        {/* მარცხენა სექცია */}
        <div className=" md:px-8 py-6 flex flex-col justify-between h-full pt-50">
          {/* ზემო ნაწილი */}
          <div className=" m-auto px-5  md:w-1/2 lg:w-full">
            <img
              className="w-1/3 mb-6"
              src="../../public/authimages/logo-dark.png"
              alt="logo"
            />
            <h3 className="text-2xl font-bold mb-2">Sign in</h3>
            <p className="text-sm mb-4 text-gray-700">
              Enter your email address and password to access your account.
            </p>

            <form id="inputs" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1" htmlFor="email">
                  Email address
                </label>
                <input
                  className="border border-black outline-none px-2 py-1 rounded w-full"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="border border-black outline-none px-2 py-1 rounded w-full"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link
                  to="/"
                  className="block text-xs text-right mt-1 text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <label className="flex items-center space-x-2 text-black text-sm">
                <input type="checkbox" className="accent-black w-4 h-4" />
                <span>Remember me</span>
              </label>

              <button
                type="submit"
                className="bg-purple-900 text-white w-full py-2 rounded mt-4 cursor-pointer hover:bg-purple-800 transition-colors"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div id="socials" className="pt-10 text-center text-sm">
              <h3>Sign in with</h3>
              {/* Add social buttons/icons here */}
            </div>
          </div>

          {/* ქვედა ნაწილი */}
          <div className="text-center text-sm mt-4">
            <span>Don't have an account? </span>
            <Link className="font-bold text-blue-700" to="/">
              Sign Up
            </Link>
          </div>
        </div>

        {/* მარჯვენა სექცია */}
        <div className="relative w-full h-full text-white hidden lg:block">
          {/* ფონის სურათი */}
          <img
            src="../../public/authimages/bg-auth.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center px-4 max-w-xl">
            <h3 className="text-2xl font-semibold mb-4">I love the color!</h3>
            <h6 className="text-base italic mb-2">
              "I've been using your theme from the previous developer for our
              web app. Once I knew a new version was out, I immediately bought
              it with no hesitation. Great themes, good documentation with lots
              of customization available and sample app that really fit our
              need."
            </h6>
            <h5 className="text-sm mt-2">- Fadlisaad (Ubold Admin User)</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
