import React from 'react'
import ReactDOM from 'react-dom'
import { Overlay } from 'react-bootstrap'

class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    render() {
        const PopupSetting = (
            <div style={{
                ...this.props.style,
                width: 300,
                position: 'absolute',
                backgroundColor: '#fff',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid #CCC',
                borderRadius: 3,
                marginLeft: -5,
                marginTop: 5,
                padding: 10,
                zIndex: 999
            }}>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Range</label>
                        <input type="number" ref="range" defaultValue={this.props.range} className="form-control" min="1" />
                    </div>
                    <div className="form-group">
                        <label>Times To Open</label>
                        <input type="number" ref="timesToOpen" defaultValue={this.props.timesToOpen} className="form-control" min="5" />
                    </div>
                    <div className="form-group">
                        <label style={{fontSize: 10, textAlign: 'center', color: '#337ab7'}}><i>Current game will be reset after update setting</i></label>
                        <input type="button" className="btn btn-primary form-control" value="Update" onClick={this.submitUpdate.bind(this)} />
                    </div>
                </div>
            </div>
        )

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <label>MENU</label>
                    <a onClick={this.toggle.bind(this)}>
                        <span className="glyphicon glyphicon-cog pull-right" ref="target" style={{ color: '#fff', fontSize: 20 }} aria-hidden="true"></span>
                    </a>
                    <Overlay
                        show={this.state.show}
                        onHide={this.toggle.bind(this)}
                        placement="bottom"
                        container={this}
                        rootClose
                        target={() => ReactDOM.findDOMNode(this.refs.target)}>
                        {PopupSetting}
                    </Overlay>
                </div>
                <div className="list-group">
                    <a className="list-group-item" onClick={this.props.newGame.bind(this)}>New Game</a>
                    <a className="list-group-item" onClick={this.props.openNumber.bind(this)}>Open New Number</a>
                </div>

            </div>
        )
    }

    toggle() {
        this.setState({ show: !this.state.show })
    }

    submitUpdate() {
        this.props.updateSettings(+this.refs.range.value, +this.refs.timesToOpen.value)
        this.props.newGame()
        this.setState({ show: false })
    }
}

export default Menu