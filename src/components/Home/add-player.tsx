import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  addPlayerAction,
  Player,
  toggleInactiveAction,
} from "../../store/Players/actions";
import { selectAllPlayers } from "../../store/Players/selector";
import { selectActivePlayers } from "../../store/Players/selector";
import { toggleActiveAction } from "../../store/Players/actions";

export enum AbilityTypes {
  proficient = "Proficient",
  competent = "Competent",
  intermediate = "Intermediate",
  beginner = "Beginner",
}

interface AddPlayer {
  addPlayer: (player: Player) => void;
  playerList: Player[];
  changeTab: () => void;
  activeList: Player[];
  toggleActive: (player: Player) => void;
  toggleInactive: (player: Player) => void;
}

const AddPlayer = (props: AddPlayer) => {
  const [name, setName] = useState("");
  const [ability, setAbility] = useState(String(AbilityTypes.beginner));

  const [player, setPlayer] = useState<Player>({
    name: "",
    ability: "Beginner",
    active: true,
  });

  const toggleAllActive = () => {
    props.playerList.map((player) => {
      if (!player.active) {
        props.toggleActive({
          name: player.name,
          ability: player.ability,
          active: player.active,
        });
      }
    });
  };

  const toggleAllInactive = () => {
    props.activeList.map((player, id) => {
      props.toggleInactive({
        name: player.name,
        ability: player.ability,
        active: player.active,
      });
    });

    // props.playerList.map((player, id) => {
    //   props.toggleInactive(
    //     { name: player.name, ability: player.ability, active: player.active },
    //     id
    //   );
    // });
  };

  const editName = (inputName: string) => {
    let name = inputName.trim().toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
  };
  useEffect(() => {
    setName(editName(name));
    setAbility(ability);
  }, [name, ability]);

  useEffect(() => {
    const active = true;
    setPlayer({ name, ability, active });
  }, [name, ability]);

  const checkRepeated = () => {
    let found = false;

    for (let i = 0; i < props.playerList.length; i++) {
      if (player.name == props.playerList[i].name) {
        found = true;
      }
    }
    return found;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (checkRepeated()) {
      window.alert("Player already added");
    } else if (player.name.trim().length == 0) {
      window.alert("Please enter a valid player");
    } else {
      props.addPlayer(player);
      setName("");
      setAbility("Beginner");
    }
  };

  return (
    <React.Fragment>
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Label>Name: </Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
            <Label>Ability: </Label>
            <Select
              name="ability"
              value={ability}
              onChange={(e) => {
                setAbility(e.target.value);
              }}
            >
              <Option>{AbilityTypes.beginner}</Option>
              <Option>{AbilityTypes.intermediate}</Option>
              <Option>{AbilityTypes.competent}</Option>
              <Option>{AbilityTypes.proficient}</Option>
            </Select>
            <button type="submit">Add Player</button>
          </Form>
        </FormContainer>
        <NumLabel>
          No. active of Players: {props.activeList.length} /{" "}
          {props.playerList.length}
        </NumLabel>
        <button
          onClick={() => {
            if (
              // props.activeList.length % 4 === 0 &&
              props.activeList.length !== 0
            ) {
              props.changeTab();
            } else {
              window.alert(
                "Number of active players must be greater 0 and divisible by 4"
              );
            }
          }}
        >
          Create Sets
        </button>

        <button onClick={toggleAllActive}>Toggle All Active</button>
        <button onClick={toggleAllInactive}>Toggle All Inactive</button>
      </Container>
    </React.Fragment>
  );
};

function mapStateToProps(state: any) {
  return {
    playerList: selectAllPlayers(state),
    activeList: selectActivePlayers(state),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addPlayer: (player: Player): void => {
      dispatch(addPlayerAction(player));
    },

    toggleActive: (player: Player): void => {
      dispatch(toggleActiveAction(player));
    },

    toggleInactive: (player: Player): void => {
      dispatch(toggleInactiveAction(player));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);

const Container = styled.div`
  width: fit-content;
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: block;
  border-radius: 6px;
  color: white;
  background-color: skyblue;

  width: fit-content;
  height: fit-content;
  padding: 20px;

  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Form = styled.form``;

const Label = styled.label`
  margin: 5px;
`;

const Input = styled.input`
  margin: 5px;
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 15px;
  //background-color: lightgreen;
`;

const Option = styled.option`
  //background-color: red;
`;

const NumLabel = styled.p`
  position: absolute;
  color: black;
  font-size: 12px;
  margin-top: -21px;
  margin-left: 5px;
`;
