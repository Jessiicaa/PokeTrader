import { Schema, model } from 'mongoose';
import { Trade } from '../interfaces/trade.interface';

const tradeModel = new Schema({
  first_player_id: {
    type: String,
    required: true,
  },
  second_player_id: {
    type: String,
    required: true,
  },
  first_player_pokemons: {
    type: Array,
    required: true,
  },
  second_player_pokemons: {
    type: Array,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model<Trade>('trade', tradeModel);
