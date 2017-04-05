import React, { PropTypes } from 'react'
import logo from '../logo.svg'
import _ from 'lodash'

class Scene extends React.Component {
  
  render() {

    //const scenes = Object.values(this.props.scenes)
    const scenes = _.values(this.props.scenes)
    
    let snapshotUrl = 'loading...'
    if (scenes && scenes[0]) {
      snapshotUrl = scenes[0].snapshot.url
    } else {
      console.log('scenes=====', scenes)
    }
    const firstScene = {...scenes[Object.keys(scenes)[0]]}
    const snapshot = {...firstScene.snapshot}    
    
    return (
      <div className="App-header">
        <div className="Scene" style={{background: `#333  url('${snapshotUrl}') top left no-repeat`, backgroundSize: '640px 360px'}}>
          <div style={{position: 'absolute'}}>
            <div className="Face" />
            <img src={logo} className="App-logo" alt="Logo" />            
          </div>          
        </div>        
      </div>
    )
  }
}

Scene.propTypes = {  
  scenes: PropTypes.object.isRequired  
}

export default Scene
