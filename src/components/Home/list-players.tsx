import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { selectAllPlayers } from "../../store/Players/selector";
import { fetchAllPlayersAction } from "../../store/Players/actions";
import PlayerCard from "./player-card";

import { Player } from "../../store/Players/actions";
import styled from "styled-components";

import { AbilityTypes as ab } from "./add-player"


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


  //  https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  function compareValues(key: string, order = 'asc') {
    return function innerSort(a: any, b: any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      let varA: string | number = "";
      let varB: string | number = ""
      
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

      // const varA = (typeof a[key] === 'string')
      //   ? a[key].toUpperCase() : a[key];
      // const varB = (typeof b[key] === 'string')
      //   ? b[key].toUpperCase() : b[key];
  
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

  useEffect(() => {
    switch (sort) {
      case SortType.none:
        break;
        case SortType.a_first:
          setPlayerList(props.playerList.sort(compareValues('name')));
          break;
        case SortType.a_last:
          setPlayerList(props.playerList.sort(compareValues('name', 'desc')));
          break;
        case SortType.highest_first:
          setPlayerList(props.playerList.sort(compareValues('ability')));
          break;
        case SortType.lowest_first:
          setPlayerList(props.playerList.sort(compareValues('ability', 'desc')));
          break;
        default:
          break;
    }
  }, [sort, playerList])



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