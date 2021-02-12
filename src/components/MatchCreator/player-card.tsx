import React from "react";
import styled from "styled-components";

interface PlayerProps {
  name: string;
  ability: string;
  id: number;

  className?: string;
}

const PlayerCard = (props: PlayerProps) => {
  return (
    <Container className={props.className}>
      <Name>{props.name}</Name>
      <Ability>{props.ability}</Ability>
    </Container>
  );
};

export default PlayerCard;

const Container = styled.div`
  // display: block;
  // border-radius: 20px;
  // color: white;
  // background-color: skyblue;

  // height: fit-content;
  // word-wrap: break-word;

  // width: 100%;
  // padding: 10px;
  // z-index: 1000;

  // margin: auto;
  // margin: 20px;

  //width: 40vw;
  padding: 20px 5vw;

  margin: auto;
  background-image: linear-gradient(135deg, lightgrey 50%, grey 100%);
  color: black;

  &.second {
    background-image: linear-gradient(135deg, grey 50%, lightgrey 100%);
    color: white;
  }
`;

const Name = styled.div`
  // border: 1px solid gray;
  // width: fit-content;
  // padding: 5px;

  // border-radius: 6px;

  display: inline;
  margin-right: 10px;
`;

const Ability = styled.div`
  // //border: 1px solid gray;
  // width: fit-content;
  // padding: 5px;

  // border-radius: 6px;

  display: inline;
`;
