import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { selectPlayers } from "../../store/Players/selector"
import { fetchPlayersAction } from "../../store/Players/actions"
import Player from "./player"
import styled from "styled-components";

interface Set {
    teamOne: {
        playerOne: PlayerWithRating,
        playerTwo: PlayerWithRating,
    },
    teamTwo: {
        playerOne: PlayerWithRating,
        playerTwo: PlayerWithRating,
    }
}

interface ListPlayersProps {
    fetchPlayers: () => void;
    playerList: Player[];
    changeTab: () => void;
}

interface PlayerWithRating {
    name: string,
    ability: any,
}

const Matches = (props: ListPlayersProps) => {
    const LIMIT = 0;
    const [shuffledList, setShuffledList] = useState<Array<PlayerWithRating>>([])
    const [set, setSet] = useState<Set>()
    const [setUp, setSetUp] = useState<Array<Set>>([])

    //  RANDOMLY SORT THE PLAYERS INTO A LIST
    //==========================================================
    useEffect(() => {
        props.fetchPlayers();
        
    }, []);
    
    const shufflePlayers = () => {
        const tempList: PlayerWithRating[] = props.playerList.map(a => ({...a}));

        for (let count = 0 ; count < tempList.length ; count++) {
            switch (tempList[count].ability) {
                case "Beginner":
                    tempList[count].ability = 1;
                    break;
                case "Intermediate":
                    tempList[count].ability = 2;
                    break;
                case "Competent":
                    tempList[count].ability = 3;
                    break;
                case "Proficient":
                    tempList[count].ability = 4;
                    break;
                default:
                    break;
            }

        }

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
    //==========================================================

    //  SELECT A SET
    //==========================================================
    const selectSet = (setList: PlayerWithRating[]) => {
        let list = [...setList]
        let set: Set = {
                teamOne: {
                    playerOne: {name: "", ability: {}},
                    playerTwo: {name: "", ability: {}},
                },
                teamTwo: {
                    playerOne: {name: "", ability: {}},
                    playerTwo: {name: "", ability: {}},
                }
        }

        // while (Math.abs(set.teamOne.playerOne.ability + set.teamOne.playerTwo.ability - 
        //     set.teamTwo.playerOne.ability + set.teamTwo.playerTwo.ability) <= LIMIT) 

        set.teamOne.playerOne = list[0];
            // setSet({
            //     teamOne: {
            //         playerOne: shuffledList[i * 4 + 0],
            //         playerTwo: shuffledList[i * 4 + 1],
            //     },
            //     teamTwo: {
            //         playerOne: shuffledList[i * 4 + 2],
            //         playerTwo: shuffledList[i * 4 + 3],
            //     }
            // })



            return list

    }

    const checkSet = (set: Set) => {


    }

    const createSets = () => {
        let set = selectSet(shuffledList)

    }

    useEffect(() => {
        let numSets = shuffledList.length / 4;
        console.log(numSets)
        for (let i = 0 ; i < numSets ; i++) {

            



            setSetUp((prevState) => [
                ...prevState, {
                teamOne: {
                    playerOne: shuffledList[i * 4 + 0],
                    playerTwo: shuffledList[i * 4 + 1],
                },
                teamTwo: {
                    playerOne: shuffledList[i * 4 + 2],
                    playerTwo: shuffledList[i * 4 + 3],
                }
            }

            ])
        }
        console.log(setUp)
    }, [shuffledList])
    //==========================================================


    return (
        <React.Fragment>
            <button onClick={props.changeTab}>Go Back</button>
            {setUp ? 
                <div>
                    {setUp.map((set, id) => (
                        <IndividualSet key={id}>
                            <Label>Set {id + 1}</Label>
                            <Teams>
                                <Player id={id} name={set.teamOne.playerOne.name} ability={set.teamOne.playerOne.ability}/>
                                <Player id={id} name={set.teamOne.playerTwo.name} ability={set.teamOne.playerTwo.ability}/>
                            </Teams>
                            
                            <Label>Vs</Label>
                            <Teams>
                                <Player id={id} name={set.teamTwo.playerOne.name} ability={set.teamTwo.playerOne.ability}/>
                                <Player id={id} name={set.teamTwo.playerTwo.name} ability={set.teamTwo.playerTwo.ability}/>
                            </Teams>
                        </IndividualSet>
                    ))} 
                </div>
            : null}
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

const IndividualSet = styled.div`
    background-color: peachpuff; 
    width: fit-content; 
    padding: 10px;
    margin: auto;
    margin-bottom: 10px;
`;

const Teams = styled.div`
    background-color: blue;
    width: fit-content; 
    padding: 10px;  
`;

const Label = styled.div`
    color: black;
    margin: auto;
    width: fit-content;
    padding: 5px;
`;


