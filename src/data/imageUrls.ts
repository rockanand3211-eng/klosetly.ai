/** Stable Unsplash URLs — auto=format + explicit crop dimensions */
export const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=500&q=80`
