export type GetPokemons = (url?: string, options?: RequestInit) => Promise<ApiResponseType>

type ApiResponseType = {
  count: number
  next: string
  previous: null | string
  results: Array<Pokemon>
}

type Pokemon = {
  name: string
  url: string
}

type RequestInit = {} | Record<string, any>

export type GetPokemon = (url: string) => Promise<any>
