import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden relative">
      <div id="section-first" className="w-full">
        <Header
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <img className="w-full" src="./public/tets-img-luka.jpg" />
      </div>
    </div>
  )
}
