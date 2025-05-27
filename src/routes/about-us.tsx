import { createFileRoute } from '@tanstack/react-router'

import HistorySlider from '@/components/homepagecomponents/swiper/historySlide'

import FooterComponent from '@/components/Footer'
import { AboutUs } from '@/components/about-us/AboutUs'

export const Route = createFileRoute('/about-us')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AboutUs />
      <HistorySlider />
      <FooterComponent />
    </div>
  )
}
