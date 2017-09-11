import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import SelectedPerson from '../containers/SelectedPerson'
import ImageButton from './styled/ImageButton'
import PersonLi from './styled/PersonLi'
import TimeAgo from 'react-timeago'

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

    //let attributes = this.props.profile && this.props.profile.attributes.map((a) => (<div key={a.name}><span style={{fontSize: '12px', color: '#777'}}>{a.name}</span><br/>{a.value}</div>))

    const selectedId = this.props.selectedPerson.id;

    return (
        <PersonLi alt={this.props.name} onMouseMove={this.changePic.bind(this)}
          style={{
          border: selectedId === this.props.id ? '1px solid #ADD8E6' : '1px solid #222',
          height: '100%',
          width: '320px',
          overflowX: 'hidden',
          overflowY: 'auto',
          margin: '10px',
          padding: '0px',
          flexShrink: '0',
          background: selectedId === this.props.id ? '#eee' : '#444',
          borderRadius: '2px',
          color: selectedId === this.props.id ? 'black' : 'white'
        }}>
          <img alt='' style={{ width: '30px', position: 'absolute' }} src={ this.state.currentFaceSrc } />
          <img alt='' onClick={this.props.onClick} style={{ width: '320px', cursor: 'pointer' }} src={ this.props.avatarUrl } />
          { this.props.pictures.map((pic)=> <img key={pic.id} src={pic.url} style={{width: '50px'}} />)}
          <div style={{padding: '10px', fontSize: '40px', lineHeight: '100%', wordWarp: 'break-word'}}>
            Dmitry Spasibenko
          </div>
          <div style={{padding: '10px', fontSize: '13px', lineHeight: '150%', wordWarp: 'break-word'}}>
            lastSeenAt: <TimeAgo date={this.props.lastSeenAt} /><br/>
            Profile: {this.props.profile ? 'has profile' : 'no profile' }
            <br/><br/>
            { selectedId === this.props.id ? <SelectedPerson {...this.props} /> : selectedId }
          </div>
        </PersonLi>

    )
  }
}

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  getProfile: PropTypes.func.isRequired,
  selectedPerson: PropTypes.object.isRequired
}

export default Person
