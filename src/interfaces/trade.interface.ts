import { Document } from 'mongoose';

export interface TradeDTO extends Document {
  first_player_id: string,
  second_player_id: string,
  first_player_pokemons: [],
  second_player_pokemons: []
}

export type Trade = {
  first_player_id: string,
  second_player_id: string,
  first_player_pokemons: [],
  second_player_pokemons: []
}

export type TradeInput = {
  first_player_pokemons: [],
  second_player_pokemons: []
}
