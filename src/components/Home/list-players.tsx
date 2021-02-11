import React, { useEffect } from "react";
import { connect } from "react-redux";

import { selectPlayers } from "../../store/Players/selector";
import { fetchPlayersAction } from "../../store/Players/actions";
import Player from "./player";

import { PlayerProps } from "../../store/Players/actions";

interface ListPlayersProps {
  fetchPlayers: () => void;
  playerList: PlayerProps[];
}
const ListPlayers = (props: ListPlayersProps) => {
  useEffect(() => {
    props.fetchPlayers();
  }, []);

  return (
    <React.Fragment>
      {props.playerList
        .map((player, id) => (
          <Player
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
    playerList: selectPlayers(state),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchPlayers: (): void => {
      dispatch(fetchPlayersAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayers);
