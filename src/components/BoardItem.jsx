import React from 'react'

class BoardItem extends React.Component {
    render() {
        return (
            <div className={"col-md-2 col-xs-2 " + (this.props.isFirstCol === true ? "col-md-offset-1 col-xs-offset-1" : "")}>
                <a href="javscript:void(0)" className={"thumbnail " + (this.props.isMatching ? "matching-item " : "") + (this.props.isWinnerItem ? "winning-item " : "")}>
                    <div className="text-center item">{this.props.value}</div>
                </a>
            </div>
        )
    }
}

export default BoardItem