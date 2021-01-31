import { combineReducers } from "redux";

import playerReducer from "./Players/reducer"
import shufflePlayerReducer from "./ShufflePlayers/reducer"


export const state = combineReducers({
    player: playerReducer,
    shufflePlayer: shufflePlayerReducer,
});