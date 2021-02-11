import { actionTypes as at } from "./constants";
import { Player } from "./actions";

interface Action {
  type: string;
  payload?: any;
}

interface PlayerState {
  playerList: Player[];
  isLoading: boolean;
}

const initialState: PlayerState = {
  playerList: [],
  isLoading: false,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case at.FETCH_PLAYERS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case at.FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playerList: action.payload,
      };

    case at.FETCH_PLAYERS:
      //console.log("fetching");

      return {
        ...state,
      };

    case at.ADD_PLAYER:
      //console.log("adding");

      return {
        ...state,
        playerList: [...state.playerList, action.payload],
      };

    case at.REMOVE_PLAYER:
      return {
        ...state,
        playerList: state.playerList.filter(
          (player, id) => id !== action.payload
        ),
      };

    default:
      return state;
  }
};
