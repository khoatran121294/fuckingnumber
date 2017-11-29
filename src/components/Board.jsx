import React from 'react'
import BoardItem from './BoardItem'
import PropTypes from 'prop-types'

class Board extends React.Component {
    render() {
        const BoardItems = []
        this.props.numbers.forEach((row, rIndex) => {
            let BoardRow = (
                <div className="row" key={rIndex}>
                    {
                        row.map((col, cIndex) => {
                            return (
                                <BoardItem
                                    key={rIndex + "" + cIndex}
                                    value={col}
                                    isMatching={this.props.openedNumbers.indexOf(col) > -1 ? true : false}
                                    isFirstCol={cIndex === 0 ? true : false}
                                    isWinnerItem={(rIndex === this.props.winnerRow || cIndex === this.props.winnerCol) ? true : false} />
                            )
                        })
                    }
                </div>
            )
            BoardItems.push(BoardRow)
        })
        return (
            <div id="board">
                {BoardItems}
            </div>
        )
    }
}

Board.propTypes = {
    winnerRow: PropTypes.number.isRequired,
    winnerCol: PropTypes.number.isRequired
}

Board.defaultProps = {
    winnerRow: -1,
    winnerCol: -1
}

export default Board