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
                            return <span key={index} className="list-group-item">{user.id !== this.props.userId ? user.id : <b>{user.id}</b>}</span>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CurrentUsers