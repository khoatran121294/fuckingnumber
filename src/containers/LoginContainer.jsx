import React from 'react'
import './LoginContainer.css'

class LoginContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {
                username: '',
                password: ''
            },
            status: true
        }
    }
    render() {
        return (
            <div className="login-container">
                <div className="login-form panel panel-info">
                    <div className="login-title panel-heading">
                        <label>LOGIN AS A FUCKING USER</label>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.login.bind(this)}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter fsoft account"
                                    value={this.state.user.username} onChange={this.onChangeUsername.bind(this)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Enter password"
                                    value={this.state.user.password} onChange={this.onChangePassword.bind(this)} />
                            </div>
                            <div className="form-group">
                                {
                                    this.state.status === false && <label className="error-msg">Username or password is incorrect</label>
                                }
                                <button type="submit" className="btn btn-info form-control">GO GO</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    onChangeUsername(e) {
        this.setState({
            user: Object.assign({}, this.state.user, {
                username: e.target.value
            })
        })
    }
    onChangePassword(e) {
        this.setState({
            user: Object.assign({}, this.state.user, {
                password: e.target.value
            })
        })
    }
    login(e) {
        e.preventDefault()
        const that = this
        console.log(that.state.user)
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers : new Headers(),
            body: JSON.stringify({
                body: 'hello'
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    this.setState({
                        status: false
                    })
                    return
                }
                console.log('oke')
                this.props.history.push('/')
            })
    }
}



export default LoginContainer