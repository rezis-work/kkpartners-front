import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-screen h-screen bg-red-600">
      <div id="section-first" className="w-full">
        <Header bgColor={'transparent'} />
        <img src="./public/tets-img-luka.jpg" />
      </div>
    </div>
  )
}
