import React from 'react'
import GameContainer from './containers/GameContainer'
import LoginContainer from './containers/LoginContainer'
import './App.css'
import Store from './stores/Store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={GameContainer} />
            <Route exact path='/login' render={(props) => <LoginContainer {...props} />}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
