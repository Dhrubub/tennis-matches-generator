import {actionTypes as at} from "./constants"
import { Player } from './actions'

interface Action {
    type: string,
    payload?: any,

}

interface PlayerState {
    playerList: Player[];
    isLoading: boolean;

}

const testList = [
    {name: "Dhruv", ability: "Proficient"},
    {name: "Shrenik", ability: "Proficient"},
    {name: "Roshan", ability: "Competent"},
    {name: "Daniel", ability: "Proficient"},

    {name: "Mansoor", ability: "Proficient"},
    {name: "Anirudh", ability: "Proficient"},
    {name: "Ray L", ability: "Proficient"},
    {name: "Thushara", ability: "Proficient"},

    {name: "Derrick", ability: "Competent"},
    {name: "Ken", ability: "Competent"},
    {name: "Frankie", ability: "Intermediate"},
    {name: "Azia", ability: "Intermediate"},

    {name: "Harsh", ability: "Intermediate"},
    {name: "Saad", ability: "Intermediate"},
    {name: "Melissa", ability: "Beginner"},
    {name: "Mustafa", ability: "Beginner"},

    {name: "Terry", ability: "Competent"},
    {name: "Jay", ability: "Competent"},
    {name: "Ray R", ability: "Proficient"},
    {name: "Jonathan", ability: "Proficient"},

    {name: "Yuji", ability: "Proficient"},
    {name: "Manoj", ability: "Competent"},
    {name: "Anubhav", ability: "Intermediate"},
    {name: "Geoff", ability: "Competent"},

]

const initialState: PlayerState = {
    playerList: testList,
    isLoading: false
}

export default (state = initialState, action: Action) => {
    
    switch(action.type) {

        case at.FETCH_PLAYERS_BEGIN:
            return {
                ...state,
                isLoading: true
            }

        case at.FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                playerList: action.payload
            }

        case at.FETCH_PLAYERS:
            //console.log("fetching");
            
            return {
                ...state,

        }

        case at.ADD_PLAYER:
            //console.log("adding");
            
            return {
                ...state,
                playerList: [...state.playerList, action.payload]

        }

        case at.REMOVE_PLAYER:
            return {
                ...state,
                playerList: state.playerList.filter((player, id) => id !== action.payload )

        }

        default: 
            return state;
            
    }

};