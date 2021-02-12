import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { selectAllPlayers } from "../../store/Players/selector";
import { fetchAllPlayersAction } from "../../store/Players/actions";
import PlayerCard from "./player-card";

import { Player } from "../../store/Players/actions";
import styled from "styled-components";


enum SortType {
  none = "none",
  a_first = "a to z",
  a_last = "z to a",
  highest_first = "high to low",
  lowest_first = "low to high"

}
interface ListPlayersProps {
  fetchAllPlayers: () => void;
  playerList: Player[];
}
const ListPlayers = (props: ListPlayersProps) => {
  const [playerList, setPlayerList] = useState(props.playerList);
  const [sort, setSort] = useState(String(SortType.none));

  useEffect(() => {
    props.fetchAllPlayers();
  }, []);



  return (
    <React.Fragment>
      <Container>
      <Label>Sort by: </Label>
      <Select
        name="sort"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <Option>{SortType.none}</Option>
        <Option>{SortType.a_first}</Option>
        <Option>{SortType.a_last}</Option>
        <Option>{SortType.highest_first}</Option>
        <Option>{SortType.lowest_first}</Option>
      </Select>
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
  
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
  //background-color: lightgreen;
`;

const Option = styled.option`
  //background-color: red;
`;

const Label = styled.option`
display: inline;
margin-left: 5%;
margin-right: 2%;
  //background-color: red;
`;