import {createStore, compose, combineReducers,applyMiddleware} from "redux";
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';
import { createSession } from 'redux-session';
import userReducer from "../reducer/userReducer";
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import {persistStore, autoRehydrate} from 'redux-persist'

let store = compose(autoRehydrate())(createStore)(combineReducers({userReducer}));
persistStore(store);

export default store;
