import axios from 'axios';

class PokemonServices {
  public async getPokemon(pokemonName: string): Promise<any> {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
      const response = await axios.get(url);
      const { name, base_experience: baseExperience } = response.data;
      if (!name || !baseExperience) {
        throw new Error('Pokemon name or base experience not found');
      }
      return { name, baseExperience };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default PokemonServices;
