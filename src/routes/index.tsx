import { createFileRoute } from '@tanstack/react-router'
import 'leaflet/dist/leaflet.css'

import HeaderMain from '../components/header/HeaderMain'
import FooterComponent from '@/components/Footer'

import HomePage from '@/components/homepagecomponents/HomePage'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden relative">
      <div id="section-first" className="w-full">
        <HeaderMain
          bgColor={'rgb(247,243,239)'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <img className="w-full" src="./public/tets-img-luka.jpg" />
        {/* <FooterComponent /> */}
        <HomePage />
        <FooterComponent />
      </div>
    </div>
  )
}
