import React from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'
import { newGame, openNumber, checkWinner, updateSettings, _openNumber } from '../actions/GameAction'
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
        const { isWinner, openedNumbers, numbers, winnerRow, winnerCol, timesToOpen, range } = this.props.data
        return (
            <Game
                isWinner={isWinner}
                openedNumbers={openedNumbers}
                numbers={numbers}
                winnerRow={winnerRow}
                winnerCol={winnerCol}
                timesToOpen={timesToOpen}
                range={range}
                newGame={this.updateNewGame.bind(this)}
                openNumber={this.props._openNumber.bind(this)}
                checkWinner={this.props._checkWinner.bind(this)}
                updateSettings={this.props._updateSettings.bind(this)}
                currentUsers={this.state.currentUsers}
                userId={this.state.userId} />
        )
    }

    componentDidMount() {
        const that = this
        const { openedNumbers } = this.props.data
        // display all current sockets
        socket.on('server:send_current_users', function (currentUsers) {
            that.setState({
                currentUsers,
                userId: socket.id
            })
            console.log(currentUsers)
        })
 
        socket.on('server:send_opened_number', function (number) {
            openedNumbers.push(number)
            that.props._updateOpenedNumber(openedNumbers)
            console.log(number)
        })

        socket.on('server:new_game_all', function () {
            that.props._newGame()
        })
    }

    updateNewGame () {
        console.log('new game')
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
            dispatch(checkWinner())
        },
        _updateSettings: (range, timesToOpen) => {
            dispatch(updateSettings(range, timesToOpen))
        },
        _updateOpenedNumber: (openedNumbers) => {
            dispatch(_openNumber(openedNumbers))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)