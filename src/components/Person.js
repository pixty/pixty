import React, { PropTypes } from 'react'
import _ from 'lodash'
import SelectedPerson from '../containers/SelectedPerson'
//import ReactTooltip from 'react-tooltip'

let lastX = 1

class Person extends React.Component {

  constructor(props) {
    super(props)
    this.state = { currentPictureSrc: this.props.pictures[0].url, pictureIndex: 0, pictureCount:this.props.pictures.length  }
  }

  changePic(event) {        
    let offset =  Math.abs(event.nativeEvent.offsetX - lastX)
    if (offset > 640/this.state.pictureCount/2) {
      lastX = event.nativeEvent.offsetX
      let index = this.state.pictureIndex < this.state.pictureCount - 1 ? this.state.pictureIndex + 1 : 0    
      this.setState( { currentPictureSrc: this.props.pictures[index].url, pictureIndex:index })      
    }
    
  }

  render() {
    return (
      <div>        
        <li alt={this.props.name} className="Snapshot--size" onMouseMove={this.changePic.bind(this)} data-tip={this.props.name}
          onClick={this.props.onClick} style={{
          border: this.props.selectedId === this.props.id ? '2px solid orange' : '2px solid rgba(0,0,0,0.5)',
          cursor: 'pointer',
          margin: '10px',
          padding: '0px',
          overflow: 'hidden',
          //opacity: this.props.selectedId === this.props.id ? 1.0 : 0.4,      
          borderRadius: '2px',        
          float: 'left'
        }}>
        { this.props.selectedId === this.props.id ? <SelectedPerson /> : '' }              
        <img alt={this.props.name} className="Snapshot--size" src={ this.state.currentPictureSrc } style={{ borderRadius: '2px'}}/>
        </li>    
      
    </div>
    )
  }
}

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,  
}

export default Person
