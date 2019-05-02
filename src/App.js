import React from 'react'
import './App.css'
import Home from './components/Home'

class App extends React.Component {
  state = {
    name: false
  }

  changeName(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <input type="text" name="name" onChange={(event) => this.changeName(event)} placeholder="Enter your name" />
        <Home name={this.state.name} />
      </div>
    )
  }
}

export default App
