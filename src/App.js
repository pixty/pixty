import React, { Component } from 'react'
import './App.css'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import UserList from './containers/UserList'
import Scene from './containers/Scene'
import LoadingBar from 'react-redux-loading-bar'


class App extends Component {
  render() {
    return (      
      <div className="App">
        <LoadingBar style={{ backgroundColor: 'green', height: '4px' }} />
        <Scene />
        <UserList />
        <button onClick={ () => {          
          this.props.dispatch(push('/about'))
        }}>About</button>
        
      </div>
    );
  }
}

export default connect()(App)
