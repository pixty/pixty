import React, { PropTypes } from 'react'
import _ from 'lodash'
//import ReactTooltip from 'react-tooltip'

let lastX = 1

class Person extends React.Component {

  constructor(props) {
    super(props)
    this.state = { currentPictureSrc: this.props.pictures[0].url, pictureIndex: 0, pictureCount:this.props.pictures.length  }
  }

  changePic(event) {        
    let offset =  Math.abs(event.nativeEvent.offsetX - lastX)
    if (offset > 20) {
      lastX = event.nativeEvent.offsetX
      let index = this.state.pictureIndex < this.state.pictureCount - 1 ? this.state.pictureIndex + 1 : 0    
      this.setState( { currentPictureSrc: this.props.pictures[index].url, pictureIndex:index })      
    }
    
  }

  render() {
    return (
      <li alt={this.props.name} onMouseMove={this.changePic.bind(this)} data-tip={this.props.name} onClick={this.props.onClick} style={{
        borderColor: this.props.selectedId === this.props.id ? 'orange' : 'white',
        cursor: 'pointer',
        border: '3px solid white',
        margin: '4px',
        padding: '0px',
        borderRadius: '5px',
        overflow: 'hidden',
        width: '100px',
        height: '100px',
        float: 'left'
      }}>
      
      <img alt={this.props.name} src={ this.state.currentPictureSrc } style={{ width: '100px', height: '100px'}}/>    
    </li>
    )
  }
}

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,  
}

export default Person
