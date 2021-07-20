export type Pokemon = {
  name: string,
  baseExperience: number,
}

export type pokemonsPlayer = {
  pokemonsPlayerOne: Array<Pokemon>,
  pokemonsPlayerTwo: Array<Pokemon>,
  fairTrade: string
}
