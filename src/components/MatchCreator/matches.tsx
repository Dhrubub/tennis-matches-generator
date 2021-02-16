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
  const [dummyList, setDummyList] = useState<Array<PlayerWithRating>>([]);
  const [set, setSet] = useState<Set>();
  const [setUp, setSetUp] = useState<Array<Set>>([]);
  const [sortedList, setSortedList] = useState<Array<Pair>>([]);

  //  RANDOMLY SORT THE PLAYERS INTO A LIST
  //==========================================================
  useEffect(() => {
    props.fetchActivePlayers();
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
      const t1p1 = items[j].playerOne.ability !== "Dummy" ? items[j].playerOne.ability : 2;
      const t1p2 = items[j].playerTwo.ability !== "Dummy" ? items[j].playerTwo.ability : 2;

      const t2p1 = items[right].playerOne.ability !== "Dummy" ?  items[right].playerOne.ability : 2;
      const t2p2 = items[right].playerTwo.ability !== "Dummy" ? items[right].playerTwo.ability : 2;

      //console.log({t1p1, t1p2, t2p1, t2p2});

      if (
        t1p1 + t1p2 >
        t2p1 + t2p2
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
  }, [props.playerList]);

  useEffect(() => {

    const dummies = (4 - props.playerList.length % 4) !== 4 ? 4 - props.playerList.length % 4 : 0;
    let dummiesList: any = []
    for (let i = 0 ; i < dummies ; i++) {
      dummiesList = [...dummiesList, {name: "Dummy", ability: "Dummy"}]    
    }

    setSortedList(createSets(selectPairs(shuffledList)));
    //console.log(selectPairs(shuffledList))

    const pairsList = createSets(selectPairs([...shuffledList, ...dummiesList]))
    let tempList: PlayerWithRating[] = [];

    for (let i = 0 ; i < pairsList.length ; i++) {
      if (pairsList[i].playerOne) {
        tempList =  [...tempList, pairsList[i].playerOne]
      }

      if (pairsList[i].playerTwo) {
        tempList =  [...tempList, pairsList[i].playerTwo]
      }
    }

    tempList = tempList.filter(player => player.ability !== "Dummy")
    
    for (let i = 0 ; i < dummies ; i++) {
      tempList.splice(i*2, 0, {name: "Dummy", ability: 0})
    }
    
    //console.log(tempList)
    //console.log(selectPairs(tempList))

    //setSortedList(createSets(selectPairs(tempList)));
    //setSortedList(pairsList)
    //setDummyList(tempList);

  }, [shuffledList]);

  useEffect(() => {
    //console.log(dummyList)
    //setSortedList(selectPairs(dummyList))
  }, [dummyList])

  useEffect(() => {
    setSetUp(createMatches(sortedList));
  }, [sortedList]);

  useEffect(() => {
    //console.log(setUp);
  }, [setUp]);
  //==========================================================

  return (
    <React.Fragment>
      <button onClick={props.changeTab}>Go Back</button>
      <MatchesContainer>
        <GridContainer>
          {setUp ? (
            <Grid>
              {setUp.map((set, id) => {
                //console.log(set)
              return (
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
              )})}
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
