import React, { Component } from 'react'
import LineChart from './Components/LineChart'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <LineChart
              height={300}
              width={600}
          />
      </div>
    )
  }
}

export default App;
