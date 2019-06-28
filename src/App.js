import React from 'react'
import './sass/main.scss'

import { Switch, Route } from 'react-router'

import Home from './components/Home'
import Shop from './containers/Shop'

class App extends React.Component {
  render() {
    const helloText = "Welcome to baltGro Shop! Please select a shop below."
    return (
      <div className="App">
        <main className="main">
          <div className="container">
            <div className="content">
              <div className="card mb-3">
                <div className="card-body">
                  <Switch>
                    <Route exact path="/" render={() => <Home helloText={helloText} />}/>
                    <Route exact path="/:shop" component={Shop}/>
                    <Route exact path="/:shop/:plugin" component={Shop}/>
                  </Switch>
                </div>
             </div>
            </div>
          </div>
      </main>
      </div>
    )
  }
}

export default App
