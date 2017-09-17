import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SelectedPerson from '../containers/SelectedPerson';
import ImageButton from './styled/ImageButton';
import PersonLi from './styled/PersonLi';
import TimeAgo from 'react-timeago';
import { mainColor } from '../components/styled/Colors';
import styled from 'styled-components';
import Picture from '../components/Picture';
import Spinner from './Spinner';

let lastX = 1;
export const PERSON_WIDTH = 300;

class Person extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentFaceSrc: this.props.pictures[0].url, currentPictureSrc: this.props.pictures[0].picURL, pictureIndex: 0, pictureCount:this.props.pictures.length  };
  }

  componentWillMount() {
    this.props.getProfile();
  }

  changePic(event) {
    let offset =  Math.abs(event.nativeEvent.offsetX - lastX);
    if (offset > 640/this.state.pictureCount/2) {
      lastX = event.nativeEvent.offsetX;
      let index = this.state.pictureIndex < this.state.pictureCount - 1 ? this.state.pictureIndex + 1 : 0;
      this.setState( { currentFaceSrc: this.props.pictures[index].url, currentPictureSrc: this.props.pictures[index].picURL, pictureIndex:index });
    }

  }

  render() {

    //let attributes = this.props.profile && this.props.profile.attributes.map((a) => (<div key={a.name}><span style={{fontSize: '12px', color: '#777'}}>{a.name}</span><br/>{a.value}</div>))

    const selectedId = this.props.selectedPerson.id;

    return (
        <PersonLi alt={this.props.name} onMouseMove={this.changePic.bind(this)}
          style={{
          border: selectedId === this.props.id ? `1px solid ${mainColor}` : '1px solid #555',
          height: '100%',
          width: `${PERSON_WIDTH}px`,
          float: 'left',
          margin: '0px',
          marginRight: '10px',
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: '0px',
          boxShadow: selectedId === this.props.id ? '4px 4px 6px rgba(0,0,0,0.2)' : '2px 2px 2px rgba(0,0,0,0.2)',
          background: selectedId === this.props.id ? '#eee' : '#444',
          borderRadius: '2px',
          color: selectedId === this.props.id ? 'black' : 'white'
        }}>

          <div onClick={this.props.onClick} style={{cursor: 'pointer', overflowX: 'scroll', overflowY: 'hidden'}}>
            <div style={{overflowScrolling: "touch",
        WebkitOverflowScrolling: "touch", width: PERSON_WIDTH * this.props.pictures.length + 'px'}}>
              { this.props.pictures.map((pic)=> <Picture key={pic.id} width={PERSON_WIDTH} placeholder={<Spinner noLabel />} src={pic.url} /> )}
            </div>
          </div>

          <div style={{padding: '10px', fontSize: '14px', fontWeight: 'normal', lineHeight: '150%', wordWrap: 'break-word'}}>
            <div style={{float:'right', textAlign: 'right'}}>
              <div style={{fontSize: '11px', opacity: 0.5}}>Visit Count</div>
              <div>1</div>
            </div>
            <div style={{fontSize: '11px', opacity: 0.5}}>Last seen at</div>
            <div><TimeAgo date={this.props.lastSeenAt} /></div>

            <div style={{marginTop: '10px', fontSize: '25px', fontWeight: 'normal', lineHeight: '100%', wordWrap: 'break-word'}}>
              { this.props.profile && this.props.profile.attributes.map((attr) => <div key={attr.value}>
                <div style={{fontSize: '14px', opacity: 0.3}}>{attr.name}</div>
                <div>{attr.value}</div>
                </div>) }
            </div>

            { selectedId === this.props.id ? <SelectedPerson {...this.props} /> : selectedId }
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
