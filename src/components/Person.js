import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SelectedPerson from '../containers/SelectedPerson';
import ImageButton from './styled/ImageButton';
import PersonLi from './styled/PersonLi';
import TimeAgo from 'react-timeago';
import { mainColor } from '../components/styled/Colors';
import Picture from '../components/Picture';
import Spinner from './Spinner';
import { PERSON_WIDTH } from './Constants';

let lastX = 1;

class Person extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mount: false, currentFaceSrc: this.props.pictures[0].url, pictureField: 'url',
      currentPictureSrc: this.props.pictures[0].picURL, pictureIndex: 0, pictureCount:this.props.pictures.length  };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ mount: true }), 100);
  }

  changePic(event) {
    let offset =  Math.abs(event.nativeEvent.offsetX - lastX);
    if (offset > 640/this.state.pictureCount/2) {
      lastX = event.nativeEvent.offsetX;
      let index = this.state.pictureIndex < this.state.pictureCount - 1 ? this.state.pictureIndex + 1 : 0;
      this.setState( { currentFaceSrc: this.props.pictures[index].url, currentPictureSrc: this.props.pictures[index].picURL, pictureIndex:index });
    }

  }

  toggleImageSource = el => {
    this.setState({ pictureField: this.state.pictureField === 'url' ? 'picURL' : 'url'});
  }

  render() {

    //let attributes = this.props.profile && this.props.profile.attributes.map((a) => (<div key={a.name}><span style={{fontSize: '12px', color: '#777'}}>{a.name}</span><br/>{a.value}</div>))

    const selectedId = this.props.selectedPerson.id;
    let startSize = 25;

    //<PersonLi alt={this.props.name} onMouseMove={this.changePic.bind(this)}
    return (
        <PersonLi alt={this.props.name}
          style={{
          border: selectedId === this.props.id ? `1px solid ${mainColor}` : '1px solid #555',
          height: '100%',
          width: `${PERSON_WIDTH}px`,
          margin: '0px',
          marginRight: '10px',
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: '0px',
          transform: this.state.mount ? 'scale(1.0)' : 'scale(0.8)',
          opacity: this.state.mount ? 1.0 : 0.0,
          boxShadow: selectedId === this.props.id ? '4px 4px 6px rgba(0,0,0,0.2)' : '2px 2px 2px rgba(0,0,0,0.2)',
          background: selectedId === this.props.id ? '#fff' : '#cecece',
          borderRadius: '2px',
          color: selectedId === this.props.id ? 'black' : 'black'
        }}>

          <div onClick={this.props.onClick} style={{cursor: 'pointer', overflowX: 'scroll', overflowY: 'hidden', position: '', zIndex: 1, top: 0}}>
            <div style={{overflowScrolling: "touch",
        WebkitOverflowScrolling: "touch", width: PERSON_WIDTH * this.props.pictures.length + 'px'}}>
              { this.props.pictures.map((pic)=> <Picture key={pic.id} width={PERSON_WIDTH} placeholder={<Spinner noLabel />} src={pic[this.state.pictureField]} /> )}
            </div>
          </div>

          <div style={{padding: '10px 20px', fontSize: '14px', fontWeight: 'normal', lineHeight: '150%', wordWrap: 'break-word'}}>
            <div style={{float:'right', textAlign: 'right'}}>
              <div style={{fontSize: '11px', opacity: 0.5}}>Visit Count: 1</div>
              <div style={{float: 'right'}}>
                <ImageButton type='image' onClick={this.toggleImageSource} src={ this.state.pictureField === 'url' ? '/images/scene.svg' : '/images/face.svg'} width='20px' />
              </div>
            </div>
            <div style={{fontSize: '11px', opacity: 0.5}}>Last seen at</div>
            <div><TimeAgo date={this.props.lastSeenAt} /></div>

            <div style={{marginTop: '10px', fontWeight: 'normal', wordWrap: 'break-word'}}>
              { this.props.profile && this.props.profile.attributes.map((attr) => <div key={attr.value}>
                <div style={{fontSize: '12px', color: '#ccc'}}>{attr.name}</div>
                <div style={{lineHeight: '100%', fontSize: startSize+'px' }}>{(startSize -= 5) && attr.value }</div>
                </div>) }
            </div>

            <div>
              { selectedId === this.props.id ? <SelectedPerson {...this.props} /> : selectedId }
            </div>
          </div>
        </PersonLi>

    );
  }
}

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  getProfile: PropTypes.func.isRequired,
  selectedPerson: PropTypes.object.isRequired
};

export default Person;
