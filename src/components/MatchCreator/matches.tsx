import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { selectActivePlayers } from "../../store/Players/selector";
import { fetchActivePlayersAction } from "../../store/Players/actions";
import PlayerCard from "./player-card";
import styled from "styled-components";

import {AbilityTypes as ab} from "../Home/add-player";

interface Set {
  teamOne: {
    playerOne: PlayerWithRating;
    playerTwo: PlayerWithRating;
  };
  teamTwo: {
    playerOne: PlayerWithRating;
    playerTwo: PlayerWithRating;
  };
}

interface Pair {
  playerOne: PlayerWithRating;
  playerTwo: PlayerWithRating;
}

interface PlayerWithRating {
  name: string;
  ability: any;
}

interface ListPlayersProps {
  fetchActivePlayers: () => void;
  playerList: Player[];
  changeTab: () => void;
}

const Matches = (props: ListPlayersProps) => {
  const LIMIT = 0;
  const [shuffledList, setShuffledList] = useState<Array<PlayerWithRating>>([]);
  const [set, setSet] = useState<Set>();
  const [setUp, setSetUp] = useState<Array<Set>>([]);
  const [sortedList, setSortedList] = useState<Array<Pair>>([]);

  //  RANDOMLY SORT THE PLAYERS INTO A LIST
  //==========================================================
  useEffect(() => {
    props.fetchActivePlayers();
    console.log("fetching active players only");
  }, []);

  const shufflePlayers = () => {
    const tempList: PlayerWithRating[] = props.playerList.map((a) => ({
      ...a,
    }));

    for (let count = 0; count < tempList.length; count++) {
      switch (tempList[count].ability) {
        case ab.beginner:
          tempList[count].ability = 1;
          break;
        case ab.intermediate:
          tempList[count].ability = 2;
          break;
        case ab.competent:
          tempList[count].ability = 3;
          break;
        case ab.proficient:
          tempList[count].ability = 4;
          break;
        default:
          tempList[count].ability = 0;
          break;
      }
    }

    let m = tempList.length,
      t,
      i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = tempList[m];
      tempList[m] = tempList[i];
      tempList[i] = t;
    }

    return tempList;
  };

  //==========================================================

  //  SELECT PAIRS
  //==========================================================
  const selectPairs = (playerList: PlayerWithRating[]) => {
    let pairsList: Pair[] = [];
    for (let i = 0; i < playerList.length; i++) {
      let tempPair = {
        playerOne: playerList[i],
        playerTwo: playerList[i + 1],
      };
      pairsList = [...pairsList, tempPair];
      i++;
    }

    return pairsList;
  };

  const createSets = (pairsList: Pair[]) => {
    return quickSort(pairsList, 0, pairsList.length - 1);
  };

  const createMatches = (pairsList: Pair[]) => {
    let setUp: Set[] = [];
    for (let i = 0; i < pairsList.length; i++) {
      let match = {
        teamOne: {
          ...pairsList[i],
        },
        teamTwo: {
          ...pairsList[i + 1],
        },
      };
      setUp = [...setUp, match];
      i++;
    }
    return setUp;
  };

  function quickSort(items: Pair[], left: number, right: number) {
    if (left < right) {
      let q = partition(items, left, right);
      quickSort(items, left, right - 1);
      quickSort(items, q + 1, right);
    }
    return items;
  }

  function partition(items: Pair[], left: number, right: number) {
    let i = left - 1;
    let pivot = items[right];

    for (let j = left; j < right; j++) {
      if (
        items[j].playerOne.ability + items[j].playerTwo.ability >
        items[right].playerOne.ability + items[right].playerTwo.ability
      ) {
        i++;
        let temp = items[j];
        items[j] = items[i];
        items[i] = temp;
      }
    }
    for (let x = right; x > i + 1; x--) {
      items[x] = items[x - 1];
    }

    items[i + 1] = pivot;
    return i + 1;
  }

  useEffect(() => {
    setShuffledList(shufflePlayers());
    console.log(props.playerList);
  }, [props.playerList]);

  useEffect(() => {
    setSortedList(createSets(selectPairs(shuffledList)));
  }, [shuffledList]);

  useEffect(() => {
    setSetUp(createMatches(sortedList));
  }, [sortedList]);

  useEffect(() => {
    console.log(setUp);
  }, [setUp]);
  //==========================================================

  return (
    <React.Fragment>
      <button onClick={props.changeTab}>Go Back</button>
      <MatchesContainer>
        <GridContainer>
          {setUp ? (
            <Grid>
              {setUp.map((set, id) => (
                <IndividualSet key={id}>
                  <Label>Court {8 - id}</Label>
                  <TeamsContainer>
                    <Teams>
                      <PlayerCard
                        id={id}
                        name={set.teamOne.playerOne.name}
                        ability={set.teamOne.playerOne.ability}
                      />
                      <PlayerCard
                        id={id}
                        name={set.teamOne.playerTwo.name}
                        ability={set.teamOne.playerTwo.ability}
                      />
                    </Teams>

                    <Label>Vs</Label>
                    <Teams>
                      <PlayerCard
                        className="second"
                        id={id}
                        name={set.teamTwo.playerOne.name}
                        ability={set.teamTwo.playerOne.ability}
                      />
                      <PlayerCard
                        className="second"
                        id={id}
                        name={set.teamTwo.playerTwo.name}
                        ability={set.teamTwo.playerTwo.ability}
                      />
                    </Teams>
                  </TeamsContainer>
                </IndividualSet>
              ))}
            </Grid>
          ) : null}
        </GridContainer>
      </MatchesContainer>
    </React.Fragment>
  );
};

function mapStateToProps(state: any) {
  return {
    playerList: selectActivePlayers(state),
  };
}

interface Player {
  name: string;
  ability: string;
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchActivePlayers: (): void => {
      dispatch(fetchActivePlayersAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);

const MatchesContainer = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  text-align: center;

  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
`;

const GridContainer = styled.div`
  width: fit-content;
  margin: auto;
`;

const Grid = styled.div`
  width: fit-content;
  margin: auto;

  display: grid;

  grid-template-columns: 1fr 1fr;
`;

const IndividualSet = styled.div`
  // background-color: red;
  // width: 40vw;
  // min-width: 200px;
  // min-height: calc(50vh - 30px);
  // margin: auto;
  // margin: 30px;
  // //margin-left: 6vw;
  // //margin-bottom: 10px;

  // display: inline-block;

  // border-radius: 6px;

  // text-align: left;

  margin: 10px;
  padding: 20px;

  background-image: linear-gradient(135deg, tomato 20%, salmon 100%);
`;

const TeamsContainer = styled.div`
  // background-color: #000000;
  // //width: 80%;
  // padding: 10px;

  // margin: auto;
`;

const Teams = styled.div`
  // background-color: blue;
  // width: fit-content;
  // padding: 10px 50px;

  // margin: auto;
`;

const Label = styled.div`
  // color: black;
  // margin: auto;
  // width: fit-content;
  // padding: 5px;
`;
