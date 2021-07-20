import axios from 'axios';
import HttpStatusCode from 'http-status-codes';
import { Model } from 'mongoose';
import db from '../db';
import { Pokemon, pokemonsPlayer } from '../interfaces/pokemon.interface';
import { Trade, TradeInput } from '../interfaces/trade.interface';
import tradeModel from '../models/trade.model';
import utils from '../utils';

class PokemonServices {
  constructor() {
    db();
  }

  private get repositoryTrades(): Model<Trade> {
    return tradeModel;
  }

  private async getPokemon(pokemonName: string): Promise<any> {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
      const response = await axios.get(url);
      const { name, base_experience: baseExperience } = response.data;
      if (!name || !baseExperience) {
        throw new Error('Pokemon name or base experience not found');
      }
      const pokemonData = { name, baseExperience };

      return pokemonData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private fairTrade(
    pokemonsPlayerOne: Array<Pokemon>,
    pokemonsPlayerTwo: Array<Pokemon>,
  ): boolean {
    const amountPlayerOne = pokemonsPlayerOne.reduce((acc, item) => item.baseExperience + acc, 0);
    const amountPlayerTwo = pokemonsPlayerTwo.reduce((acc, item) => item.baseExperience + acc, 0);

    const diff = Math.abs(Math.round(amountPlayerOne - amountPlayerTwo));

    const arraySort = [amountPlayerOne, amountPlayerTwo].sort(
      (a, b) => ((b < a ? 1 : b) < a ? -1 : 0),
    );
    const percent = 0.1 * arraySort[0];
    if (diff > percent) {
      return false;
    }
    return true;
  }

  public async createTrade(
    playerOnePokemons: Array<string>,
    playerTwoPokemons: Array<string>,
  ): Promise<pokemonsPlayer> {
    try {
      let fairnessMessage: string;
      if (!playerOnePokemons) {
        throw new Error(`{status: ${HttpStatusCode.BAD_REQUEST}, message: Valid pokemon not received}`);
      }
      if (!playerTwoPokemons) {
        throw new Error(`{status: ${HttpStatusCode.BAD_REQUEST}, message: Valid pokemon not received}`);
      }
      const pokemonsArrayPlayerOne: Array<Pokemon> = await Promise.all(
        await playerOnePokemons.map(async (pokemon): Promise<Pokemon> => {
          const pokemonData = await this.getPokemon(pokemon);
          return pokemonData;
        }),
      );

      const pokemonsArrayPlayerTwo: Array<Pokemon> = await Promise.all(
        await playerTwoPokemons.map(async (pokemon): Promise<Pokemon> => {
          const pokemonData = await this.getPokemon(pokemon);
          return pokemonData;
        }),
      );

      const fairTrade = this.fairTrade(pokemonsArrayPlayerOne, pokemonsArrayPlayerTwo);

      if (!fairTrade) {
        fairnessMessage = 'This trade is not fair';
      } else {
        fairnessMessage = 'This trade is fair';
        const transaction = {
          first_player_pokemons: pokemonsArrayPlayerOne,
          second_player_pokemons: pokemonsArrayPlayerTwo,
        } as TradeInput;
        const createNotation = await this.createNotationHistory(transaction);
        if (!createNotation) {
          throw new Error(`{status: ${HttpStatusCode.INTERNAL_SERVER_ERROR}, message: Error to create notation.}`);
        }
      }

      return {
        pokemonsPlayerOne: pokemonsArrayPlayerOne,
        pokemonsPlayerTwo: pokemonsArrayPlayerTwo,
        fairTrade: fairnessMessage,

      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async createNotationHistory(data: TradeInput): Promise<Trade> {
    try {
      const tradeToInsert = {
        first_player_id: utils.generateUUIds(),
        second_player_id: utils.generateUUIds(),
        first_player_pokemons: data.first_player_pokemons,
        second_player_pokemons: data.second_player_pokemons,
      } as TradeInput;
      const historyInsert = await this.repositoryTrades.create(tradeToInsert);
      return historyInsert;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async listTrades(): Promise<Array<Trade>> {
    try {
      const history = await this.repositoryTrades.find();
      if (!history) {
        throw new Error(`{status: ${HttpStatusCode.NOT_FOUND}, message: History not found.}`);
      }
      return history;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default PokemonServices;
