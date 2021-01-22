import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

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
    id: number
}

const Player = (props: PlayerProps) => {
    return (
        <Container>
            { props.name }
            <br />
            { props.ability }
            <br />
        </Container>
        
    );
}



export default Player;