import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { addPlayer, removePlayer } from "../store/Players/actions"

const Container = styled.div`
    display: block;
    border-radius: 6px;
    color: white;
    background-color: skyblue;

    width: fit-content;
    height: fit-content;
    padding: 50px;

    margin: auto;
    margin-bottom: 20px;
    margin-top: 20px;

    
`;

interface AddPlayerProps {
    addPlayer: (name: string, ability: string)  => void
}
const AddPlayer = (props: AddPlayerProps) => {
    const [name, setName] = useState("")
    const [ability, setAbility] = useState("Beginner");

    useEffect(() => {
        setName(name)
        setAbility(ability)

    },[name, ability]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.addPlayer(name, ability);


        const player = {
            name,
            ability
        }

        //console.log(player)
    }

    return (
        <React.Fragment>
            <Container>
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
            </Container>
                
            
        </React.Fragment>
        
    );
}

function mapDispatchToProps(dispatch: any) {
    return {
        addPlayer: (name: string, ability: string): void => {
            dispatch(addPlayer({name, ability}))
        }
    }

}

export default connect(null, mapDispatchToProps)(AddPlayer);