import { GAME } from '../constants/ActionTypes'
import FunctionUltils from '../FunctionUltils'
import {socket} from '../socket/socket-api'

const _newGame = (numbers) => {
    return {
        type: GAME.NEW_GAME,
        numbers
    }
}

export const _openNumber = (openedNumbers) => {
    return {
        type: GAME.OPEN_NUMBER,
        openedNumbers
    }
}

const _checkWinner = (isWinner, winnerRow, winnerCol) => {
    return {
        type: GAME.CHECK_WINNER,
        isWinner,
        winnerRow,
        winnerCol
    }
}

export const _gameOver = (fuckingUsers, isGameOver) => {
    return {
        type: GAME.GAME_OVER,
        fuckingUsers,
        isGameOver
    }
}

export const updateSettings = (range, timesToOpen) => {
    return {
        type: GAME.UPDATE_SETTINGS,
        range,
        timesToOpen
    }
}

export function newGame() {
    return (dispatch, getState) => {
        const { range } = getState().GameReducer
        const numbers = FunctionUltils.initDataOnBoard(5, range)
        dispatch(_newGame(numbers))
    }
}

export function openNumber() {
    return (dispatch, getState) => {
        const { range, numbers, isGameOver } = getState().GameReducer
        if (!numbers || !numbers[0] || !numbers[0][0]) {
            alert('Choose New Game to start before open any numbers ')
            return
        }
        if (isGameOver === true) {
            alert('Game is Over !\nChoose New Game to start again.')
            return
        }
        const number = FunctionUltils.randomNumberInRange(range)
        // openedNumbers.push(number)
        // dispatch(_openNumber(openedNumbers))

        // send numbers to server side
        socket.emit("client:open_number", number);
    }
}

export function checkWinner() {
    return (dispatch, getState) => {
        const { openedNumbers, numbers } = getState().GameReducer
        let isWinning = false

        // check rows are matching
        for (let i = 0; i < numbers.length; i++) {
            isWinning = true
            for (let j = 0; j < numbers[i].length; j++) {
                if (openedNumbers.indexOf(numbers[i][j]) === -1) {
                    isWinning = false
                    break
                }
            }
            if (isWinning) {
                dispatch(_checkWinner(true, i, -1))
                return true
            }
        }

        // check cols are matching
        for (let i = 0; i < numbers.length; i++) {
            isWinning = true
            for (let j = 0; j < numbers[i].length; j++) {
                if (openedNumbers.indexOf(numbers[j][i]) === -1) {
                    isWinning = false
                    break
                }
            }
            if (isWinning) {
                dispatch(_checkWinner(true, -1, i))
                return true
            }
        }

        // no rows and cols are matching
        dispatch(_checkWinner(false, -1, -1))
        return false
    }
}

