import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { removePlayerAction } from "../../store/Players/actions"

const Container = styled.div`
    display: block;
    border-radius: 20px;
    color: white;
    background-color: skyblue;
    
    height: fit-content;
    word-wrap: break-word;

    width: 300px;
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
            { props.ability }
            <br />
            <button onClick={handleRemove}>Remove</button>
        </Container>
        
    );
}

function mapDispatchToProps(dispatch: any) {
    return {
        removePlayer: (id: number): void => {
            dispatch(removePlayerAction(id))
        }
    }

}


export default connect(null, mapDispatchToProps)(Player);