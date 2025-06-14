import React, { createContext, useEffect, useState } from 'react'

interface CloudinaryUploadOptions {
  cloudName: string
  uploadPreset: string
  sources?: Array<string>
  showAdvancedOptions?: boolean
  cropping?: boolean
  multiple: boolean
  theme?: string
  maxImageFileSize?: number
  croppingShowBackButton?: boolean
  folder?: string
}

interface UploadWidgetContextType {
  loaded: boolean
}

interface UploadWidgetProps {
  uwConfig: CloudinaryUploadOptions
  setState: React.Dispatch<React.SetStateAction<string | null>>
  widgetButtonText: string
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: CloudinaryUploadOptions,
        callback: (error: any, result: any) => void,
      ) => CloudinaryUploadWidget
    }
  }

  interface CloudinaryUploadWidget {
    open: () => void
  }
}

const UploadWidgetContext = createContext<UploadWidgetContextType | undefined>(
  undefined,
)

function UploadWidget({
  uwConfig,
  setState,
  widgetButtonText,
}: UploadWidgetProps) {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const uwScript = document.getElementById('uw')
    if (!uwScript) {
      const script = document.createElement('script')
      script.setAttribute('async', '')
      script.setAttribute('id', 'uw')
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.addEventListener('load', () => setLoaded(true))
      document.body.appendChild(script)
    } else {
      setLoaded(true)
    }
  }, [])

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            setState(result.info.secure_url)
          }
        },
      )

      myWidget.open()
    }
  }

  return (
    <UploadWidgetContext.Provider value={{ loaded }}>
      <button
        type="button"
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
        disabled={!loaded}
      >
        {widgetButtonText}
      </button>
    </UploadWidgetContext.Provider>
  )
}

export default UploadWidget
export { UploadWidgetContext }
