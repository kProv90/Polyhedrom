interface Character {
  id: number
  name: string
  race: string
  class: string
  level: number
  status: 'Concept' | 'In Campaign' | 'Retired'
  campaign: string | null
  traits: string[]
  created: string
}
