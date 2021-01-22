import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { addPlayerAction, Player } from "../../store/Players/actions"
import { selectPlayers } from "../../store/Players/selector";

const Container = styled.div`
    width: fit-content;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 20px;  
`;

const FormContainer = styled.div`
    display: block;
    border-radius: 6px;
    color: white;
    background-color: skyblue;

    width: fit-content;
    height: fit-content;
    padding: 20px;

    margin: auto;
    margin-bottom: 20px;
    margin-top: 20px;
`;


interface AddPlayerProps {
    addPlayer: (player: Player) => void
    playerList: Player[];
    changeTab: () => void;
}

const AddPlayer = (props: AddPlayerProps) => {
    const [name, setName] = useState("")
    const [ability, setAbility] = useState("Beginner");

    const [player, setPlayer] = useState<Player>({name: "", ability: "Beginner"});

    useEffect(() => {
        setName(name.trim().toLowerCase())
        setAbility(ability)

    },[name, ability]);

    useEffect(() => {
        setPlayer({name , ability})

    },[name, ability]);


    const checkRepeated = () => {
        let found = false;

        for (let i = 0 ; i < props.playerList.length ; i++) {
            if (player.name == props.playerList[i].name) {
                found = true;
            }
        }
        return found;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        if (checkRepeated()) {
            window.alert("Player already added")
        }
        else if (player.name.trim().length == 0) {
            window.alert("Please enter a valid player")

        }
        else {

            props.addPlayer(player);
            setName("")
            setAbility("Beginner")
        }

    }

    return (
        <React.Fragment>
            <Container>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <label>Name: </label>
                    <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}}></input>
                    <br />
                    <br />
                    <label>Ability: </label>
                    <select name="ability" value={ability} onChange={(e) => {setAbility(e.target.value)}}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </form>

            </FormContainer>
                <button onClick={props.changeTab}>Create Sets</button>
            </Container>
                
            
        </React.Fragment>
        
    );
}

function mapStateToProps(state: any) {
    return ({
        playerList: selectPlayers(state)
    })
}

function mapDispatchToProps(dispatch: any) {
    return {
        addPlayer: (player: Player): void => {
            dispatch(addPlayerAction(player))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);