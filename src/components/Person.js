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

    let attributes = this.props.profile && this.props.profile.attributes.map((a) => (<p><span style={{fontSize: '12px'}}>{a.name}</span><br/>{a.value}</p>))

    return (
        <PersonLi alt={this.props.name} className="Snapshot--size" onMouseMove={this.changePic.bind(this)}
          style={{
          border: this.props.selectedId === this.props.id ? '2px solid #ADD8E6' : '2px solid rgba(0,0,0,0.5)',
          margin: '10px',
          padding: '0px',
          background: this.props.selectedId === this.props.id ? '#eee' : '#444',
          borderRadius: '2px',
          color: 'black',
          float: 'left'
        }}>
          <img alt='' onClick={this.props.onClick} style={{ width: '330px', cursor: 'pointer' }} src={ this.state.currentFaceSrc } />
          <div style={{float: 'right', marginRight: '10px'}}>
            <ImageButton width="16px" type="image" src="/images/menu.svg" />
          </div>
          <div style={{padding: '10px', fontSize: '11px'}}>
            {this.props.id}
            {this.props.profile ? this.props.profile.avatarUrl : 'no profile' }
          </div>
          <div style={{padding: '10px', fontSize: '18px', lineHeight: '100%'}}>
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
