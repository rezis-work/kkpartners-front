import { createFileRoute } from '@tanstack/react-router'
import 'leaflet/dist/leaflet.css'

import HeaderMain from '../components/header/HeaderMain'
import FooterComponent from '@/components/Footer'

import HomePage from '@/components/homepagecomponents/HomePage'
import HomePageCarousel from '@/components/homepagecomponents/HomePageCarousel'
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden relative">
      <div id="section-first" className="w-full">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <HomePageCarousel />
        <HomePage />
        <FooterComponent />
      </div>
    </div>
  )
}
