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
