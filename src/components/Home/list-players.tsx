import React, { useEffect } from "react";
import { connect } from "react-redux";

import { selectAllPlayers } from "../../store/Players/selector";
import { fetchAllPlayersAction } from "../../store/Players/actions";
import PlayerCard from "./player-card";

import { Player } from "../../store/Players/actions";
import styled from "styled-components";

interface ListPlayersProps {
  fetchAllPlayers: () => void;
  playerList: Player[];
}
const ListPlayers = (props: ListPlayersProps) => {
  useEffect(() => {
    props.fetchAllPlayers();
  }, []);

  return (
    <React.Fragment>
      <Container>
      {props.playerList
        .map((player, id) => (
          <PlayerCard
          key={id}
          id={id}
          name={player.name}
          ability={player.ability}
          active={player.active}
          />
          ))
          .reverse()}
        </Container>
    </React.Fragment>
  );
};

function mapStateToProps(state: any) {
  return {
    playerList: selectAllPlayers(state),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchAllPlayers: (): void => {
      dispatch(fetchAllPlayersAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayers);

const Container = styled.div`
  width: 100%;;
  max-width: 800px;

  margin: auto;
  margin-bottom: 20px;
  
`