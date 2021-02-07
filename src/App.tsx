import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from "react-redux";
import store from "./store/store"

import styled from "styled-components";

import AddPlayer from "./components/Home/add-player";
import ListPlayers from "./components/Home/list-players";

import Home from "./components/Home"
import MatchCreator from "./components/MatchCreator"

export enum Tab {
  HOME,
  MATCH_CREATOR
}

const App = () => {
  const [tab, setTab] = useState<Tab>(Tab.HOME)
  return (
    <Provider store={store}>
      <Container>

      { tab === Tab.HOME ? 
        <Home changeTab={()=>setTab(Tab.MATCH_CREATOR)}/>
        :null}

      { tab === Tab.MATCH_CREATOR ? 
        <MatchCreator changeTab={()=>setTab(Tab.HOME)}/>
        :null}
      </Container>
    </Provider>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  
`
