import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { addPlayerAction, Player } from "../../store/Players/actions"
import { selectPlayers } from "../../store/Players/selector";

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




interface AddPlayerProps {
    addPlayer: (player: Player) => void
    playerList: Player[];
    changeTab: () => void;
}

const AddPlayer = (props: AddPlayerProps) => {
    const [name, setName] = useState("")
    const [ability, setAbility] = useState("Beginner");

    const [player, setPlayer] = useState<Player>({name: "", ability: "Beginner"});

    const editName = (inputName: string) => {
        let name = inputName.trim().toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name
    }
    useEffect(() => {
        setName(editName(name))
        setAbility(ability)

    },[name, ability]);

    useEffect(() => {
        setPlayer({name, ability})

    },[name, ability]);


    const checkRepeated = () => {
        let found = false;

        for (let i = 0 ; i < props.playerList.length ; i++) {
            if (player.name == props.playerList[i].name) {
                found = true;
            }
        }
        return found;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        if (checkRepeated()) {
            window.alert("Player already added")
        }
        else if (player.name.trim().length == 0) {
            window.alert("Please enter a valid player")

        }
        else {

            props.addPlayer(player);
            setName("")
            setAbility("Beginner")
        }

    }

    return (
        <React.Fragment>
            <Container>

            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Label>Name: </Label>
                    <Input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}}></Input>
                    <Label>Ability: </Label>
                    <Select name="ability" value={ability} onChange={(e) => {setAbility(e.target.value)}}>
                        <Option>Beginner</Option>
                        <Option>Intermediate</Option>
                        <Option>Advanced</Option>
                    </Select>
                    <button type="submit">Add Player</button>
                </Form>

            </FormContainer>
                <button onClick={props.changeTab}>Create Sets</button>
            </Container>
                
            
        </React.Fragment>
        
    );
}

function mapStateToProps(state: any) {
    return ({
        playerList: selectPlayers(state)
    })
}

function mapDispatchToProps(dispatch: any) {
    return {
        addPlayer: (player: Player): void => {
            dispatch(addPlayerAction(player))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);