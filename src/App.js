import React from 'react'
import './sass/main.scss'

import { Switch, Route } from 'react-router'

import Shop from './containers/Shop'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main className="main">
          <div className="container">
            <div className="content">
                  <Switch>
                    <Route exact path="/" component={() => { window.location.href = "http://airtel.lv"; return null; } }/>
                    <Route exact path="/:shop" component={Shop}/>
                    <Route exact path="/:shop/:plugin" component={Shop}/>
                  </Switch>
            </div>
          </div>
      </main>
      </div>
    )
  }
}

export default App
