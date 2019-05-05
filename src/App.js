import React from 'react'
import './sass/main.scss'

import { Switch, Route } from 'react-router'

import Home from './components/Home'
import Shop from './containers/Shop'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:shop" component={Shop}/>
        <Route exact path="/:shop/:plugin" component={Shop}/>
        </Switch>
      </div>
    )
  }
}

export default App
