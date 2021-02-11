import { actionTypes as at } from "./constants";
import { PlayerProps } from "./actions";

interface Action {
  type: string;
  payload?: any;
}

interface PlayerState {
  playerList: PlayerProps[];
  activeList: PlayerProps[];
  isLoading: boolean;
}

const testList = [
  { name: "Dhruv", ability: "Proficient", active: true },
  { name: "Shrenik", ability: "Proficient", active: true },
  { name: "Roshan", ability: "Competent", active: true },
  { name: "Daniel", ability: "Proficient", active: true },

  { name: "Mansoor", ability: "Proficient", active: false },
  { name: "Anirudh", ability: "Proficient", active: false },
  { name: "Ray L", ability: "Proficient", active: false },
  { name: "Thushara", ability: "Proficient", active: false },

  { name: "Derrick", ability: "Competent", active: false },
  { name: "Ken", ability: "Competent", active: false },
  { name: "Frankie", ability: "Intermediate", active: false },
  { name: "Azia", ability: "Intermediate", active: false },

  { name: "Harsh", ability: "Intermediate", active: false },
  { name: "Saad", ability: "Intermediate", active: false },
  { name: "Melissa", ability: "Beginner", active: false },
  { name: "Mustafa", ability: "Beginner", active: false },

  { name: "Terry", ability: "Competent", active: false },
  { name: "Jay", ability: "Competent", active: false },
  { name: "Ray R", ability: "Proficient", active: false },
  { name: "Jonathan", ability: "Proficient", active: false },

  { name: "Yuji", ability: "Proficient", active: false },
  { name: "Manoj", ability: "Competent", active: false },
  { name: "Anubhav", ability: "Intermediate", active: false },
  { name: "Geoff", ability: "Competent", active: false },
];

const initialState: PlayerState = {
  playerList: testList,
  activeList: [
    { name: "Dhruv", ability: "Proficient", active: true },
    { name: "Shrenik", ability: "Proficient", active: true },
    { name: "Roshan", ability: "Competent", active: true },
    { name: "Daniel", ability: "Proficient", active: true },
  ],
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
          (player, id) => id !== action.payload
        ),
        activeList: state.activeList.filter(
          (player, id) => id !== action.payload
        ),
      };

    case at.TOGGLE_ACTIVE:
      return {
        ...state,
        playerList: state.playerList.map((player, id) => {
          if (id === action.payload.index) {
            player.active = true;
          }
          return player;
        }),

        activeList: [...state.activeList, action.payload.player],
      };

    case at.TOGGLE_INACTIVE:
      return {
        ...state,
        playerList: state.playerList.map((player, id) => {
          if (id === action.payload.index) {
            player.active = false;
          }
          return player;
        }),

        activeList: state.activeList.filter(
          (player, id) => id !== action.payload
        ),
      };

    default:
      return state;
  }
};
