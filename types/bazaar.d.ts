interface BazaarItem {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  price: number
  category: string
  seller: string
  rating: number
  reviews: number
  tags: string[]
}

interface BzFiltersState {
  search: string
  category: string
  priceRange: [number, number]
  sortBy: string
  minRating: number
}
