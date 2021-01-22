import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from "react-redux";
import store from "./store/store"

import styled from "styled-components";

import AddPlayer from "./components/add-player";
import ListPlayers from "./components/list-players";



function App() {
  return (
    <Provider store={store}>
      <div>
          <AddPlayer/>
          <ListPlayers/>
      </div>
    </Provider>
  );
}

export default App;
