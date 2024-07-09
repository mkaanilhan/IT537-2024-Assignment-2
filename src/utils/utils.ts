//utils
import type { GetImageUrl } from '@/types/utils'

export const getImageUrl: GetImageUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
