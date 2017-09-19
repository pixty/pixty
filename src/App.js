import React, { Component } from 'react';
import Scene from './containers/Scene';
import LoadingBar from 'react-redux-loading-bar';
import { mainColor } from './components/styled/Colors';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoadingBar style={{ backgroundColor: {mainColor}, height: '2px' }} />
        <Scene />
      </div>
    );
  }
}

export default App;