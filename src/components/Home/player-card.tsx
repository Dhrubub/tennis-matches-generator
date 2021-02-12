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
  removePlayer: (name: string) => void;
  toggleActive: (player: Player) => void;
  toggleInactive: (player: Player) => void;
  id: number;
}

const PlayerCard = (props: PlayerProps) => {
  const handleRemove = () => {
    props.removePlayer(props.name);
  };

  const toggleActive = () => {
    if (props.active) {
      props.toggleInactive({
        name: props.name,
        ability: props.ability,
        active: props.active,
      });
    } else {
      props.toggleActive({
        name: props.name,
        ability: props.ability,
        active: props.active,
      });
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
    removePlayer: (name: string): void => {
      dispatch(removePlayerAction(name));
    },

    toggleActive: (player: Player): void => {
      dispatch(toggleActiveAction(player));
    },

    toggleInactive: (player: Player): void => {
      dispatch(toggleInactiveAction(player));
    },
  };
}

export default connect(null, mapDispatchToProps)(PlayerCard);

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
