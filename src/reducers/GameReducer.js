import { GAME } from '../constants/ActionTypes'
import FunctionUltils from '../FunctionUltils'
// Object.assign is not yet fully supported in all browsers, so we fallback to a polyfill
const assign = Object.assign || require('object.assign');

const initialState = {
    numbers: FunctionUltils.initEmptyNumbers(),
    openedNumbers: [],
    isWinner: false,
    range: 10,
    timesToOpen: 10,
    winnerRow: -1,
    winnerCol: -1
}



function GameReducer (state = initialState, action) {
    switch (action.type) {
        case GAME.NEW_GAME:
        return assign({}, state, {
            numbers: action.numbers,
            openedNumbers: action.openedNumbers,
            isWinner: action.isWinner,
            winnerRow: -1,
            winnerCol: -1
        })
        case GAME.OPEN_NUMBER:
        return assign({}, state, {
            openedNumbers: action.openedNumbers
        })
        case GAME.CHECK_WINNER:
        return assign({}, state, {
            isWinner: action.isWinner,
            winnerRow: action.winnerRow,
            winnerCol: action.winnerCol
        })
        case GAME.UPDATE_SETTINGS: 
        return assign({}, state, {
            range: action.range,
            timesToOpen: action.timesToOpen
        })
        default:
            return state
    }
}

export default GameReducer