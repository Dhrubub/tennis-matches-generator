import {actionTypes as at} from "./constants"

export interface Player {
    name: string,
    ability: string,
}

export const fetchPlayersBeginAction = () => {
    return {
        type: at.FETCH_PLAYERS_BEGIN,
    }
}

export const fetchPlayersSuccessAction = (players: Player[]) =>{
    return {
        type: at.FETCH_PLAYERS_SUCCESS,
        payload: players
    }
}

export const fetchPlayersAction = () => {
    return {
        type: at.FETCH_PLAYERS,
    }
}

export const addPlayerAction = (player: Player) => {
    return {
        type: at.ADD_PLAYER,
        payload: player, 
    };
    
};

export const removePlayerAction = (index: number) => {
    return {
        type: at.REMOVE_PLAYER,
        payload: index, 
    };
    
};