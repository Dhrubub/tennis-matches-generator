import { setMaxListeners } from "process";
import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Store } from "redux";

import { selectPlayers } from "../store/Players/selector"
import { addPlayer, fetchPlayers, fetchPlayersBeginAction, fetchPlayersSuccessAction } from "../store/Players/actions"
import { state } from "../store/root-reducer";
import Player from "./player";



// const ListPlayersSimple = () => {

//     const [players, setPlayers] = useState<Player[]>([]);

//     useEffect(() => {
       
//         fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
//             return res.json()
//         }).then( json => {
//             return json.map((t: any) => {
//                 const player: Player = {name: t.title, ability: t.body}
//                 return player;
//             })
//         }).then((players: Player[]) => {
//             setPlayers(players)
//         });
           
//     }, [])

//     return (
//         <ul>
//             { players.map(t => {
//                 return (
//                     <li>t.ability</li>
//                 )
//             })}
//         </ul>
//     )
// }




interface ListPlayersProps {
    fetchPlayers: () => void;
    playerList: Player[];
}
const ListPlayers = (props: ListPlayersProps) => {
    useEffect(() => {
        props.fetchPlayers();
        
    }, []);

    React.useEffect(() => {
        //console.log(props.playerList);
    }, );

    return (
        <React.Fragment>
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
            dispatch(fetchPlayers())
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayers);