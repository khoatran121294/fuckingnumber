import React from 'react'

class OpenedNumbers extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center label-opened-numbers">
                    {
                        this.props.openedNumbers.length > 0 ? this.props.openedNumbers.map((b, index) => {
                            return index === 0 ? <span key={index}>{b}</span> : <span key={index}> - {b}</span>
                        }) : (
                                <span>EMPTY</span>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default OpenedNumbers