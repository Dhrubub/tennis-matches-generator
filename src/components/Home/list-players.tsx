import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { selectAllPlayers } from "../../store/Players/selector";
import { fetchAllPlayersAction } from "../../store/Players/actions";
import PlayerCard from "./player-card";

import { Player } from "../../store/Players/actions";
import styled from "styled-components";

import { AbilityTypes as ab } from "./add-player"


enum SortType {
  none = "Default",
  a_first = "Name: A-Z",
  a_last = "Name: Z-A",
  highest_first = "High to Low",
  lowest_first = "Low to High",
  active_first = "Active First",
  inactive_first = "Inactive First",
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


  //  https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  function compareValues(key: string, order = 'asc') {
    return function innerSort(a: any, b: any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      let varA: any = "";
      let varB: any = ""
      
      if (key === 'name') {
        varA = a[key].toLowerCase()
        varB = b[key].toLowerCase() 
      }
      else if (key === 'ability') {
        const assignAbility = (item: string) => {
          switch (item) {
            case ab.beginner:
              return 1;
              break;
            case ab.intermediate:
              return 2;
              break;
            case ab.competent:
              return 3;
              break;
            case ab.proficient:
              return 4;
              break;
            default:
              return 0;
          }
        }
        varA = assignAbility(a[key]) 
        varB = assignAbility(b[key]) 
      }

      else if (key === "active") {
        varA = a[key];
        varB = b[key];
      }
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  const sortList = () => {
    switch (sort) {
      case SortType.none:
        break;
        case SortType.a_first:
          setPlayerList(props.playerList.slice().sort(compareValues('name', 'desc')));
          break;
        case SortType.a_last:
          setPlayerList(props.playerList.slice().sort(compareValues('name')));
          break;
        case SortType.highest_first:
          setPlayerList(props.playerList.slice().sort(compareValues('ability')));
          break;
        case SortType.lowest_first:
          setPlayerList(props.playerList.slice().sort(compareValues('ability', 'desc')));
          break;
        case SortType.active_first:
          setPlayerList(props.playerList.slice().sort(compareValues('active')));
          break;
        case SortType.inactive_first:
          setPlayerList(props.playerList.slice().sort(compareValues('active', 'desc')));
          break;
        default:
          break;
    }
  }

  useEffect(() => {
    sortList();
  }, [sort, props.playerList])



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
        <Option>{SortType.active_first}</Option>
        <Option>{SortType.inactive_first}</Option>
      </Select>
      {playerList
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
  position: relative;
  padding: 0px;
  margin-bottom: 10px;
  //background-color: lightgreen;
`;

const Option = styled.option`
  //background-color: red;
`;

const Label = styled.div`
  position: relative;
  display: inline;
  margin-left: 5%;
  margin-right: 1%;
  color: black;
  //background-color: red;
`;