import GameReducer from './GameReducer'
import FunctionUltils from '../FunctionUltils'
import { GAME } from '../constants/ActionTypes'

describe('game reducer', () => {
    it('should return initial state', () => {
        const expectedInitialState = {
            numbers: FunctionUltils.initEmptyNumbers(),
            openedNumbers: [],
            isWinner: false,
            range: 10,
            timesToOpen: 10,
            winnerRow: -1,
            winnerCol: -1
        }
        expect(GameReducer(undefined, {})).toEqual(expectedInitialState)
    })

    it('handle new game action to return new state with correct data', () => {
        const expectedNumbers = FunctionUltils.initDataOnBoard(5, 10)
        const expectedAction = {
            type: GAME.NEW_GAME,
            numbers: expectedNumbers,
            openedNumbers: [],
            isWinner: false
        }
        const expectedInitialState = {
            numbers: FunctionUltils.initEmptyNumbers(),
            openedNumbers: [],
            isWinner: false,
            range: 10,
            timesToOpen: 10,
            winnerRow: -1,
            winnerCol: -1
        }
        expect(GameReducer(expectedInitialState, expectedAction)).toEqual({
            numbers: expectedNumbers,
            openedNumbers: [],
            isWinner: false,
            range: 10,
            timesToOpen: 10,
            winnerRow: -1,
            winnerCol: -1
        })
    })
})
