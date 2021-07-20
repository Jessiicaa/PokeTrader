import { Router, Request, Response } from 'express';
import HttpStatusCode from 'http-status-codes';
import PokemonServices from '../services/pokemon.services';

const route = Router();

route.get('/:pokemonName', async (request: Request, response: Response): Promise<Response<string>> => {
  try {
    const { pokemonName } = request.params;
    const pokemonService = new PokemonServices();
    const getPokemon = await pokemonService.getPokemon(pokemonName);
    if (!getPokemon) {
      throw new Error(`{'status': ${HttpStatusCode.NOT_FOUND}, 'message': 'Not received a body response'}`);
    }
    return response.status(HttpStatusCode.OK).send(getPokemon);
  } catch (error: any) {
    throw new Error(`{'status': ${HttpStatusCode.NOT_FOUND}, 'message': ${error.message}}`);
  }
});

export default route;
