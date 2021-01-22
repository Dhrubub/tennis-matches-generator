import { combineReducers } from "redux";
import playerReducer from "./Players/reducer"


export const state = combineReducers({
    player: playerReducer
});