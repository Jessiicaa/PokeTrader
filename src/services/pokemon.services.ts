import axios from 'axios';

class PokemonServices {
  public async getterPokemon(): Promise<any> {
    try {
      const { data: pokemon } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      if (!pokemon) {
        throw new Error('Not found pokemon');
      }
      return pokemon;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default PokemonServices;
