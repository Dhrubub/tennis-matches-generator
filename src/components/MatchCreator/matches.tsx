import React, { useEffect } from "react";
import { connect } from "react-redux";

import { selectPlayers } from "../../store/Players/selector"
import { fetchPlayersAction } from "../../store/Players/actions"
import Player from "./player"

interface ListPlayersProps {
    fetchPlayers: () => void;
    playerList: Player[];
    changeTab: () => void;
}
const Matches = (props: ListPlayersProps) => {
    useEffect(() => {
        props.fetchPlayers();
        
    }, []);

    return (
        <React.Fragment>
            <button onClick={props.changeTab}>Go Back</button>
                        {props.playerList.map((player, id) => (
                <Player key={id} id={id} name={player.name} ability={player.ability}/>
            ))} 
        </React.Fragment>
        
    );
}

function mapStateToProps(state: any) {
    return ({
        playerList: selectPlayers(state)
    })
}

interface Player {
    name: string,
    ability: string,
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchPlayers: (): void => {
            dispatch(fetchPlayersAction())
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);