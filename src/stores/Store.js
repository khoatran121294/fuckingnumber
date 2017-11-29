import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import GameReducer from '../reducers/GameReducer'


const rootReducer = combineReducers({
    GameReducer
})
const Store = createStore(rootReducer, {}, applyMiddleware(thunk, logger))

export default Store