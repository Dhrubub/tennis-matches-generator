import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

import { addPlayer, removePlayer } from "../store/Players/actions"

const Container = styled.div`
    display: block;
    border-radius: 6px;
    color: white;
    background-color: skyblue;

    width: fit-content;
    height: fit-content;
    padding: 10px;
    z-index: 1000;

    margin: auto;
    margin-bottom: 20px;


    
`;

interface PlayerProps {
    name: string,
    ability: string,
    removePlayer: (key: number) => void;
    id: number
}

const Player = (props: PlayerProps) => {

    const handleRemove = () => {
        props.removePlayer(props.id);
    } 
    return (
        <Container>
            { props.name }
            <br />
            <button onClick={handleRemove}>Remove</button>
        </Container>
        
    );
}

function mapDispatchToProps(dispatch: any) {
    return {
        removePlayer: (id: number): void => {
            dispatch(removePlayer(id))
        }
    }

}


export default connect(null, mapDispatchToProps)(Player);