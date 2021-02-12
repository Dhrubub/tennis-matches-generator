import { actionTypes as at } from "./constants";
import { Player } from "./actions";

import {AbilityTypes as ab} from "../../components/Home/add-player"

interface Action {
  type: string;
  payload?: any;
}

interface PlayerState {
  playerList: Player[];
  activeList: Player[];
  isLoading: boolean;
}

const testList = [
  { name: "Dhruv", ability: ab.proficient, active: false },
  { name: "Shrenik", ability: ab.proficient, active: false },
  { name: "Roshan", ability: ab.competent, active: false },
  { name: "Daniel", ability: ab.proficient, active: false },

  { name: "Mansoor", ability: ab.proficient, active: false },
  { name: "Anirudh", ability: ab.proficient, active: false },
  { name: "Ray L", ability: ab.proficient, active: false },
  { name: "Thushara", ability: ab.proficient, active: false },

  { name: "Derrick", ability: ab.competent, active: false },
  { name: "Ken", ability: ab.competent, active: false },
  { name: "Frankie", ability: ab.intermediate, active: false },
  { name: "Azia", ability: ab.intermediate, active: false },

  { name: "Harsh", ability: ab.intermediate, active: false },
  { name: "Saad", ability: ab.intermediate, active: false },
  { name: "Melissa", ability: ab.beginner, active: false },
  { name: "Mustafa", ability: ab.beginner, active: false },

  { name: "Terry", ability: ab.competent, active: false },
  { name: "Jay", ability: ab.competent, active: false },
  { name: "Ray R", ability: ab.proficient, active: false },
  { name: "Jonathan", ability: ab.proficient, active: false },

  { name: "Yuji", ability: ab.proficient, active: false },
  { name: "Manoj", ability: ab.competent, active: false },
  { name: "Anubhav", ability: ab.intermediate, active: false },
  { name: "Geoff", ability: ab.competent, active: false },

  { name: "Anne", ability: ab.beginner, active: false },
  { name: "Jo", ability: ab.beginner, active: false },
  { name: "Indrek", ability: ab.competent, active: false },
  { name: "Nish", ability: ab.competent, active: false },

  { name: "Yogesh", ability: ab.beginner, active: false },
  { name: "Dwight", ability: ab.proficient, active: false },
  { name: "Selva", ability: ab.beginner, active: false },
  { name: "Sathya", ability: ab.beginner, active: false },
];

const initialState: PlayerState = {
  playerList: testList,
  activeList: [],
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

    case at.FETCH_ALL_PLAYERS:
      //console.log("fetching");
      return {
        ...state,
      };
    case at.FETCH_ACTIVE_PLAYERS:
      return {
        ...state,
      };

    case at.ADD_PLAYER:
      //console.log("adding");

      return {
        ...state,
        playerList: [...state.playerList, action.payload],
        activeList: [...state.activeList, action.payload],
      };

    case at.REMOVE_PLAYER:
      return {
        ...state,
        playerList: state.playerList.filter(
          (player, id) => player.name !== action.payload
        ),
        activeList: state.activeList.filter(
          (player, id) => player.name !== action.payload
        ),
      };

    case at.TOGGLE_ACTIVE:
      return {
        ...state,
        playerList: state.playerList.map((player) => {
          if (player.name === action.payload.name) {
            player.active = true;
          }
          return player;
        }),

        activeList: [...state.activeList, action.payload],
      };

    case at.TOGGLE_INACTIVE:
      console.log("inactive");
      return {
        ...state,
        playerList: state.playerList.map((player) => {
          if (player.name === action.payload.name) {
            player.active = false;
          }
          return player;
        }),

        activeList: state.activeList.filter(
          (player, id) => player.name !== action.payload.name
        ),
      };

    default:
      return state;
  }
};
