import React, { useEffect, useState } from "react";
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
    const [shuffledList, setShuffledList] = useState<Array<Player>>([])

    useEffect(() => {
        props.fetchPlayers();
        
    }, []);
    
    const shufflePlayers = () => {
        const tempList = props.playerList;
        let m = tempList.length, t, i;
          // While there remain elements to shuffle…
          while (m) {
              
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            
            // And swap it with the current element.
            t = tempList[m];
            tempList[m] = tempList[i];
            tempList[i] = t;
        }
        
        return tempList;
    }

    useEffect(() => {
        setShuffledList(shufflePlayers())
    }, [props.playerList]) 


    return (
        <React.Fragment>
            <button onClick={props.changeTab}>Go Back</button>
                        {shuffledList.map((player, id) => (
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