import React, { useEffect } from "react";
import { connect } from "react-redux";

import { selectAllPlayers } from "../../store/Players/selector";
import { fetchAllPlayersAction } from "../../store/Players/actions";
import PlayerCard from "./player-card";

import { Player } from "../../store/Players/actions";

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
