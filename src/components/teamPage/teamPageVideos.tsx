import videos from '../../../public/teamPageVideos/teamVideos' // თუ ფაილი src დირექტორიაშია

interface Props {
  video: string
  title: string
  description: string
}
export default function OurTeamVideos() {
  return (
    <div className="w-full h-full pt-10 pb-20 px-20">
      <div>
        <h3 className="text-4xl font-bold">For others is business</h3>
        <h2 className="text-4xl font-extralight pt-4">for us is personal</h2>
        <div className="w-full grid md:grid-cols-1 lg:grid-cols-3 gap-5 px-5 mt-5">
          {videos.map((video: Props, index: number) => (
            <div key={index} className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={video.video}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
