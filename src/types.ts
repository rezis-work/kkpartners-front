export interface Card {
  position: string
  image: string
  title: string
  description: string
}

export interface EachTeamMemeber {
  _id: string
  fullname: string
  position: string
  about: string
  biography: string
  image: string
  cover: string
  contact: {
    linkedin: string
    phone: string
    email: string
  }
  services: [string]
}

export interface BlogProps {
  _id: string
  id: string
  title: string
  subTitle: string
  slug: string
  content: string
  images: Array<string>
  category: string
  tags: Array<string>
  author: string
  share: {
    facebook: string
    linkedin: string
    x: string
    instagram: string
  }
  lawWays: string
}
