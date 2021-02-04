import React from 'react';
import styled from 'styled-components';

interface PlayerProps {
    name: string,
    ability: string,
    id: number
}

const Player = (props: PlayerProps) => {
    return (
        <Container>
            <Name>{ props.name }</Name>
        </Container>
        
    );
}

export default Player;

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
    margin: 20px; 
`;

const Name = styled.div`
    border: 1px solid gray;
    width: fit-content;
    padding: 5px;

    border-radius: 6px;

`;

const Ability = styled.div`
    border: 1px solid gray;
    width: fit-content;
    padding: 5px;

    border-radius: 6px;
    
`;