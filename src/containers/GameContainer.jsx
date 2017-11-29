import React from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'
import { newGame, openNumber, checkWinner, updateSettings, _openNumber, _gameOver } from '../actions/GameAction'
import {socket} from '../socket/socket-api'

class GameContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUsers: [],
            userId: ''
        }
    }

    render() {
        const { isWinner, openedNumbers, numbers, winnerRow, winnerCol, timesToOpen, range, isGameOver, fuckingUsers } = this.props.data
        return (
            <Game
                isWinner={isWinner}
                openedNumbers={openedNumbers}
                numbers={numbers}
                winnerRow={winnerRow}
                winnerCol={winnerCol}
                timesToOpen={timesToOpen}
                range={range}
                isGameOver={isGameOver}
                fuckingUsers={fuckingUsers}
                newGame={this.updateNewGame.bind(this)}
                openNumber={this.props._openNumber.bind(this)}
                updateSettings={this.props._updateSettings.bind(this)}
                currentUsers={this.state.currentUsers}
                userId={this.state.userId} />
        )
    }

    componentDidMount () {
        const that = this
        const { openedNumbers } = this.props.data
        // display all current sockets
        socket.on('server:send_current_users', function (currentUsers) {
            that.setState({
                currentUsers,
                userId: socket.id
            })
        })
 
        socket.on('server:send_opened_number', function (number) {
            that.updateOpenedNumber(number)
        })

        socket.on('server:new_game_all', function () {
            that.props._newGame()
        })

        socket.on("server:fucking_users", function (fuckingUsers) {
            console.log(fuckingUsers)
            that.props._updateGameOver(fuckingUsers, true)
        })
    }

    updateOpenedNumber (number) {
        const { openedNumbers } = this.props.data
        openedNumbers.push(number)
        this.props._updateOpenedNumber(openedNumbers)
        const isWinner = this.props._checkWinner()
        if (isWinner) {
            socket.emit("client:fucking_user", this.state.userId)
        }
    }

    updateNewGame () {
        // send trigger new game to server
        socket.emit("client:new_game")
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.GameReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _newGame: () => {
            dispatch(newGame())
        },
        _openNumber: () => {
            dispatch(openNumber())
        },
        _checkWinner: () => {
            return dispatch(checkWinner())
        },
        _updateSettings: (range, timesToOpen) => {
            dispatch(updateSettings(range, timesToOpen))
        },
        _updateOpenedNumber: (openedNumbers) => {
            dispatch(_openNumber(openedNumbers))
        },
        _updateGameOver: (fuckingUsers, isGameOver) => {
            dispatch(_gameOver(fuckingUsers, isGameOver))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)