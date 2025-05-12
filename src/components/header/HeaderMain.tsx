import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'

export type HeaderProps = {
  bgColor?: string
  darkOrLight?: string
  iconColor?: string
  isBlured?: boolean
  desktopHeaderBgColor?: string
  desktopHeaderTextColor?: string
  desktopHeaderBgColor2?: string
}

export default function HeaderMain({
  bgColor,
  iconColor,
  darkOrLight,
  isBlured,
  desktopHeaderBgColor,
  desktopHeaderTextColor,
  desktopHeaderBgColor2,
}: HeaderProps) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="absolute w-screen z-100 mt-[-1px]"
    >
      <MobileHeader darkOrLight={darkOrLight} iconColor={iconColor} />
      <DesktopHeader
        isBlured={isBlured}
        desktopHeaderBgColor2={desktopHeaderBgColor2}
        desktopHeaderBgColor={desktopHeaderBgColor}
        desktopHeaderTextColor={desktopHeaderTextColor}
        darkOrLight={darkOrLight}
      />
    </div>
  )
}
