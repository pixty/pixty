import React, { PropTypes } from 'react'
import PersonList from '../containers/PersonList'
//import SelectedPerson from '../containers/SelectedPerson'
import _ from 'lodash'

class Scene extends React.Component {
  
  render() {

    const scenes = _.values(this.props.scenes)
    const persons = _.values(this.props.persons)
    //const pictures = _.values(this.props.pictures)
    
    let snapshotScr, foundFaces
    if (scenes && scenes[0]) {
      snapshotScr = scenes[0].url      
    } 

    if (scenes && persons) {
      foundFaces = _.map(persons, id => { return id.snapshotRect })
    }

    let index = 1
    
    return (
      <div className="App-header">   
        <div className="Scene Scene--size">                  
          <div style={{position: 'absolute'}}>
            <img alt="Face" src={snapshotScr} className="Scene--size" />          
            { _.map(foundFaces, face =>
              <div className="Face" key={ index++ } /*style={{ top: face.t, left: face.l, bottom: face.b, right: face.r}}*/ />
            )}  
          </div>                  
        </div>       
        <PersonList />    
      </div>      
    )
  }
}

/*
<div className="Scene">                  
          <div style={{position: 'absolute'}}>
            <img alt="Face" src={snapshotScr} />          
            { _.map(foundFaces, face =>
              <div className="Face" key={ index++ }style={{ top: face.t, left: face.l, bottom: face.b, right: face.r}}/>
            )}  
          </div>                  
        </div>
*/

Scene.propTypes = {  
  scenes: PropTypes.object.isRequired  
}

export default Scene
