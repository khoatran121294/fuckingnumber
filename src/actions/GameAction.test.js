import * as actions from './GameAction'
import { GAME } from '../constants/ActionTypes'
import FunctionUltils from '../FunctionUltils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('game action', () => {
    it('should create an action to new game with correct data', () => {
        const store = mockStore({
            GameReducer: {
                numbers: FunctionUltils.initEmptyNumbers(),
                openedNumbers: [],
                isWinner: false,
                range: 10
            }
        })
        const { range } = store.getState().GameReducer
        const expectedNumbers = FunctionUltils.initDataOnBoard(5, range)
        const expectedActions = [
            {
                type: GAME.NEW_GAME,
                numbers: expectedNumbers,
                openedNumbers: [],
                isWinner: false
            }
        ]
        store.dispatch(actions.newGame())

        expect(store.getActions().length).toEqual(expectedActions.length)
        expect(store.getActions()[0].openedNumbers).toEqual(expectedActions[0].openedNumbers)
        expect(store.getActions()[0].isWinner).toEqual(expectedActions[0].isWinner)
        expect(store.getActions()[0].numbers).not.toBeNull()
        expect(store.getActions()[0].numbers.length).toEqual(expectedActions[0].numbers.length)
        expect(store.getActions()[0].numbers[0].length).toEqual(expectedActions[0].numbers[0].length)
    })

    it('should create an action to open number with correct data', () => {
        const expectedRange = 10
        const expectedNumbers = FunctionUltils.initDataOnBoard(5, expectedRange)
        const store = mockStore({
            GameReducer: {
                numbers: expectedNumbers,
                openedNumbers: [],
                isWinner: false,
                range: expectedRange,
                timesToOpen: 10
            }
        })

        store.dispatch(actions.openNumber())
        expect(store.getActions().length).toEqual(1)
        expect(store.getActions()[0].openedNumbers).not.toBe([])
        expect(store.getActions()[0].openedNumbers.length).toEqual(1)
        expect(store.getActions()[0].openedNumbers[0]).toBeGreaterThanOrEqual(1)
        expect(store.getActions()[0].openedNumbers[0]).toBeLessThanOrEqual(10)
    })

    it('should not create an action to open number when isWinner equals to true', () => {
        const store = mockStore({
            GameReducer: {
                isWinner: true,
                timesToOpen: 10
            }
        })
        store.dispatch(actions.openNumber())
        expect(store.getActions()).toEqual([])
    })

    it('should not create an action to open number when length of openedNumbers equals to timesOfOpen', () => {
        const expectedRange = 10
        const store = mockStore({
            GameReducer: {
                numbers: FunctionUltils.initDataOnBoard(5, expectedRange),
                openedNumbers: new Array(10),
                isWinner: false,
                timesToOpen: 10
            }
        })
        store.dispatch(actions.openNumber())
        expect(store.getActions()).toEqual([])
    })
})
