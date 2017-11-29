import React from 'react'
import PropTypes from 'prop-types'
import FunctionUltils from '../FunctionUltils'
import Menu from './Menu'
import OpenedNumbers from './OpenedNumbers'
import Board from './Board'
import CurrentUsers from './CurrentUsers'

class Game extends React.Component {
  render() {
    return (
      <div className="row random-numbers">
        <div className="col-md-3">
          <Menu
            timesToOpen={this.props.timesToOpen}
            range={this.props.range}
            newGame={this.props.newGame.bind(this)}
            openNumber={this.openNumberAndCheckResult.bind(this)}
            updateSettings={this.props.updateSettings.bind(this)} />
          {
            this.props.isWinner === true && (
              <div className="alert alert-success" role="alert">
                <strong>Congratulation !</strong><br />You are the Fucking Winner.
                          </div>
            )
          }
          {
            (this.props.isWinner === false && this.props.openedNumbers.length === this.props.timesToOpen) && (
              <div className="alert alert-danger" role="alert">
                <strong>So sorry !</strong><br />You are the Fucking Loser.
                          </div>
            )
          }
          <CurrentUsers currentUsers={this.props.currentUsers} userId={this.props.userId} />
        </div>
        <div className="col-md-9">
          <OpenedNumbers openedNumbers={this.props.openedNumbers} />
          <Board
            numbers={this.props.numbers}
            openedNumbers={this.props.openedNumbers}
            winnerRow={this.props.winnerRow}
            winnerCol={this.props.winnerCol} />
        </div>
      </div>
    )
  }

  openNumberAndCheckResult() {
    this.props.openNumber()
    this.props.checkWinner()
  }
}

Game.propTypes = {
  isWinner: PropTypes.bool.isRequired,
  openedNumbers: PropTypes.array.isRequired,
  numbers: PropTypes.array.isRequired,
  newGame: PropTypes.func.isRequired,
  checkWinner: PropTypes.func.isRequired,
  timesToOpen: PropTypes.number.isRequired,
  range: PropTypes.number.isRequired
}

Game.defaultProps = {
  isWinner: false,
  openedNumbers: [],
  numbers: FunctionUltils.initEmptyNumbers(),
  timesToOpen: 10,
  range: 10,
  newGame: function () {
    throw new Error("Method is undefined")
  },
  openNumber: function () {
    throw new Error("Method is undefined")
  },
  checkWinner: function () {
    throw new Error("Method is undefined")
  }
}

export default Game
