const occasionStyleMap = {
  casual: 'casual',
  work: 'formal',
  party: 'party',
}

export function generateOutfit(occasion, closet) {
  const targetStyle = occasionStyleMap[occasion]

  const matching = closet.filter((item) => {
    if (!item.tags) return false
    return item.tags.some((tag) => tag.toLowerCase().includes(targetStyle))
  })

  const top = matching.find((i) => i.category === 'top')
  const dress = matching.find((i) => i.category === 'dress')
  const bottom = matching.find((i) => i.category === 'bottom')
  const shoes = matching.find((i) => i.category === 'footwear')
  const accessory = matching.find((i) => i.category === 'accessory')

  const outfit = dress ? [dress, shoes, accessory] : [top, bottom, shoes, accessory]
  return outfit.filter(Boolean)
}