import type { GetPokemons, GetPokemon } from '@/types/service'

const API_URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'

export const getPokemons: GetPokemons = async (url = API_URL_POKEMONS, options) => {
  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

const API_URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

export const getPokemon: GetPokemon = async (url) => {
  const response = await fetch(API_URL_POKEMON + url)
  const data = await response.json()
  console.log(data)

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}
