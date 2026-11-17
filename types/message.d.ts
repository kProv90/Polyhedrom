interface PinnedMessage {
  id: number
  author: string
  text: string
  time: string
}

interface Message {
  id: number
  text: string
  time: string
  fromMe: boolean
  dateDivider?: string
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread?: number
  messages: Message[]
}
