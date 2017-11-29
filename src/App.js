import React from 'react'
import GameContainer from './containers/GameContainer'
import './App.css'
import Store from './stores/Store'
import { Provider } from 'react-redux'

class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <GameContainer />
      </Provider>
    )
  }
}

export default App
