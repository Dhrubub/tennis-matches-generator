import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { state } from "./root-reducer";
const initialState = {};

//const middleware = [thunk];

const store = createStore(state, initialState, applyMiddleware(thunk));

export default store;
