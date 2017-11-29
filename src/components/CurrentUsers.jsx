import React from 'react'

class CurrentUsers extends React.Component {
    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <label>CURRENT USERS</label>
                </div>
                <div className="list-group">
                    {
                        this.props.currentUsers.map((user, index) => {
                            return (
                                <span key={index} className="list-group-item">
                                    {
                                        user.id !== this.props.userId ? user.id : <b>ME</b>
                                    }
                                    {
                                        this.props.fuckingUsers.indexOf(user.id) > -1 && <b style={{color: 'red'}}> - FUCKING WINNER</b>
                                    }
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CurrentUsers