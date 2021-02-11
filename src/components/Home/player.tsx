import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  removePlayerAction,
  toggleActiveAction,
  toggleInactiveAction,
} from "../../store/Players/actions";

interface Player {
  name: string;
  ability: string;
  active: boolean;
}

interface PlayerProps {
  name: string;
  ability: string;
  active: boolean;
  removePlayer: (key: number) => void;
  toggleActive: (player: Player, key: number) => void;
  toggleInactive: (player: Player, key: number) => void;
  id: number;
}

const Player = (props: PlayerProps) => {
  const handleRemove = () => {
    props.removePlayer(props.id);
  };

  const toggleActive = () => {
    if (props.active) {
      props.toggleInactive(
        { name: props.name, ability: props.ability, active: props.active },
        props.id
      );
    } else {
      props.toggleActive(
        { name: props.name, ability: props.ability, active: props.active },
        props.id
      );
    }
  };

  return (
    <Container className={props.active ? "active" : "inactive"}>
      <PlayerName>{props.name}</PlayerName>

      <PlayerAbility>{props.ability}</PlayerAbility>
      <br />
      <br />
      <button onClick={handleRemove}>Remove</button>
      <button onClick={toggleActive}>Toggle</button>
    </Container>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    removePlayer: (id: number): void => {
      dispatch(removePlayerAction(id));
    },

    toggleActive: (player: Player, id: number): void => {
      dispatch(toggleActiveAction(player, id));
    },

    toggleInactive: (player: Player, id: number): void => {
      dispatch(toggleInactiveAction(player, id));
    },
  };
}

export default connect(null, mapDispatchToProps)(Player);

const Container = styled.div`
  display: block;
  border-radius: 20px;
  color: white;
  background-color: skyblue;

  height: fit-content;
  word-wrap: break-word;

  padding: 10px;
  z-index: 1000;

  width: fit-content;

  margin: auto;
  margin-bottom: 20px;

  &.active {
    background-color: green;
  }

  &.inactive {
    background-color: red;
  }
`;

const PlayerName = styled.label`
  float: left;
  margin-left: 20px;
  margin-right: 10vw;
  width: 80px;
`;

const PlayerAbility = styled.label`
  float: left;
  margin-left: 10px;
  width: 100px;
`;
