import { Router, Request, Response } from 'express';
import HttpStatusCode from 'http-status-codes';
import { Pokemon } from '../interfaces/pokemon.interface';
import PokemonServices from '../services/pokemon.services';

const route = Router();

route.post('/', async (request: Request, response: Response): Promise<Pokemon | any> => {
  try {
    const { pokemonsPlayerOne, pokemonsPlayerTwo } = request.body;
    const pokemonService = new PokemonServices();

    if (!pokemonsPlayerOne || !pokemonsPlayerTwo) {
      throw new Error('Not received data');
    }
    const arraypokemonsPlayerOne: object = await pokemonService.createTrade(
      pokemonsPlayerOne,
      pokemonsPlayerTwo,
    );

    return response.status(HttpStatusCode.CREATED).send(arraypokemonsPlayerOne);
  } catch (error: any) {
    return response.status(HttpStatusCode.GONE).send(error.message);
  }
});

route.get('/trades', async (request: Request, response: Response): Promise<Pokemon | any> => {
  try {
    const pokemonService = new PokemonServices();
    const tradeHistory = await pokemonService.listTrades();
    return response.status(HttpStatusCode.OK).send(tradeHistory);
  } catch (error: any) {
    return response.status(HttpStatusCode.GONE).send(error.message);
  }
});

export default route;
