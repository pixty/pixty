import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import SelectedPerson from '../containers/SelectedPerson'
import ImageButton from './styled/ImageButton'
import PersonLi from './styled/PersonLi'

let lastX = 1

class Person extends React.Component {

  constructor(props) {
    super(props)
    this.state = { currentFaceSrc: this.props.pictures[0].url, currentPictureSrc: this.props.pictures[0].picURL, pictureIndex: 0, pictureCount:this.props.pictures.length  }
  }

  componentWillMount() {
    this.props.getProfile()
  }

  changePic(event) {
    let offset =  Math.abs(event.nativeEvent.offsetX - lastX)
    if (offset > 640/this.state.pictureCount/2) {
      lastX = event.nativeEvent.offsetX
      let index = this.state.pictureIndex < this.state.pictureCount - 1 ? this.state.pictureIndex + 1 : 0
      this.setState( { currentFaceSrc: this.props.pictures[index].url, currentPictureSrc: this.props.pictures[index].picURL, pictureIndex:index })
    }

  }

  render() {

    let attributes = this.props.profile && this.props.profile.attributes.map((a) => (<div key={a.name}><span style={{fontSize: '12px', color: '#777'}}>{a.name}</span><br/>{a.value}</div>))

    return (
        <PersonLi alt={this.props.name} className="Snapshot--size" onMouseMove={this.changePic.bind(this)}
          style={{
          border: this.props.selectedId === this.props.id ? '1px solid #ADD8E6' : '1px solid #222',
          margin: '10px',
          padding: '0px',
          background: this.props.selectedId === this.props.id ? '#eee' : '#333',
          borderRadius: '2px',
          color: this.props.selectedId === this.props.id ? 'black' : 'white',
          float: 'left'
        }}>
          <img alt='' onClick={this.props.onClick} style={{ width: '330px', cursor: 'pointer' }} src={ this.state.currentFaceSrc } />
          <div style={{padding: '10px', fontSize: '11px'}}>
            {this.props.id}
            {this.props.profile ? this.props.profile.avatarUrl : 'no profile' }
          </div>
          <div style={{padding: '10px', fontSize: '20px', lineHeight: '100%'}}>
            {attributes ? attributes : null }
          </div>
          { this.props.selectedId === this.props.id ? <SelectedPerson {...this.props} /> : '' }
        </PersonLi>
    )
  }
}

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  getProfile: PropTypes.func.isRequired
}

export default Person
