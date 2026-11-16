interface Player {
  name: string
  avatar: string
}

interface Campaign {
  id: number
  title: string
  description: string
  image: string
  status: 'Active' | 'Paused' | 'Completed'
  players: Player[]
}
