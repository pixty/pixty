import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ImageButton from './styled/ImageButton';
import { Button, CancelButton } from './styled/Button';
import PersonLi from './styled/PersonLi';
import TimeAgo from 'react-timeago';
import { mainColor } from '../components/styled/Colors';
import Picture from '../components/Picture';
import Spinner from './Spinner';
import { PERSON_WIDTH } from './Constants';

let lastX = 1;

class Person extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { mount: false, currentFaceSrc: this.props.pictures[0].url, pictureField: 'picURL',
      selected: false,
      currentPictureSrc: this.props.pictures[0].picURL, pictureIndex: 0, pictureCount:this.props.pictures.length  };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ mount: true }), 100);
  }

  setSelected = () => {
    this.setState({ selected: !this.state.selected});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedPerson.id !== nextProps.selectedPerson.id) {
      this.setState({ selected: false});
    }
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
    const { matches } = this.props;
    matches.sort((a,b) => (b.id - a.id));

    const selectedId = this.props.selectedPerson.id;
    const isSelected = selectedId === this.props.id || this.state.selected;
    let startSize = 25;

    //<PersonLi alt={this.props.name} onMouseMove={this.changePic.bind(this)}
    return (
        <PersonLi alt={this.props.name}
          onClick={this.setSelected}
          style={{
          border: selectedId === this.props.id ? `3px solid ${mainColor}` : '1px solid rgba(255,255,255,0.1)',
          height: '100%',
          width: `${PERSON_WIDTH}px`,
          margin: '0px',
          marginRight: '10px',
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: '0px',
          transform: this.state.mount ? 'scale(1.0)' : 'scale(0.5)',
          opacity: this.state.mount ? 1.0 : 0.0,
          boxShadow: isSelected ? '4px 4px 6px rgba(0,0,0,0.2)' : '2px 2px 2px rgba(0,0,0,0.2)',
          background: isSelected ? '#fff' : 'rgba(255,255,255,.1)',
          borderRadius: '2px',
          color: isSelected ? 'black' : 'white'
        }}>

          <div onClick={this.props.onClick} style={{cursor: 'pointer', background:'none', overflowX: 'scroll', overflowY: 'hidden'}}>
            <div style={{overflowScrolling: "touch", display: 'flex',
        WebkitOverflowScrolling: "touch", width: PERSON_WIDTH * this.props.pictures.length + 'px'}}>
              { this.props.pictures.map((pic, index)=> <Picture index={index} leftTop={pic.rect.leftTop}
                containerWidth={PERSON_WIDTH} pictureField={this.state.pictureField}
                rightBottom={pic.rect.rightBottom} key={pic.id} width={PERSON_WIDTH}
                placeholder={<Spinner noLabel />} src={pic[this.state.pictureField]} /> )}
            </div>
          </div>

          <div style={{padding: '10px 20px', paddingRight: '10px', fontSize: '14px', fontWeight: 'normal',
          color: isSelected ? '#444' : '#fff',
          background: isSelected ? '#fff' : 'rgba(0,0,0,0.1)', borderBottom: `1px solid rgba(0,0,0,0.2)`}}>

            <div style={{float:'right', textAlign: 'right', marginLeft: '10px'}}>
              <ImageButton type='image' onClick={(event) => { event.stopPropagation(); this.props.onClick(); }} src= { isSelected ? '/images/grey_write.svg' : '/images/write.svg' } width='24px' />
            </div>

            <div style={{float:'right', textAlign: 'right'}}>
              <ImageButton type='image' onClick={(event) => { event.stopPropagation(); this.toggleImageSource(event);}} src={ this.state.pictureField === 'url' || isSelected ? '/images/grey_eye.svg' : '/images/eye.svg'} width='24px' />
            </div>

            <div style={{fontSize: '11px', opacity: 0.5}}>Last seen at</div>
            <div><TimeAgo date={this.props.lastSeenAt} /></div>
          </div>

          <div style={{padding: '0px 20px', fontSize: '14px', fontWeight: 'normal', lineHeight: '150%', wordWrap: 'break-word'}}>
            <div style={{marginTop: '0px', fontWeight: 'normal', wordWrap: 'break-word'}}>
              <div style={{fontWeight: 'light', fontSize: '13px', display: 'flex', marginTop: '10px'}}>

                { this.props.matchingResult && this.props.matchingResult !== 'identified' &&
                  <img alt='Profile Avatar' src={this.props.avatarUrl} style={{width: '100px', height: '100px', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.2)'}}/>
                }

                {matches && matches.map( match => <div style={{padding: '3px'}}key={match.id}>
                  <img title={match.id} alt={match.id} src={match.avatarUrl || '/images/missing.png'} style={{width: '100px', borderRadius: '50px', height: '100px', border: '1px solid rgba(0,0,0,0.2)'}}/>
                </div>)}
              </div>

              <div style={{color: 'green'}}>{ this.props.matchingResult }</div>

              { this.props.profile && this.props.profile.attributes && this.props.profile.attributes.map((attr) => <div key={attr.value}>
                <div style={{lineHeight: '120%', marginTop: '10px', fontSize: startSize+'px', whiteSpace: 'pre-line' }}>{(startSize -= 5) && attr.value }</div>
                </div>) }

            </div>

          </div>
        </PersonLi>
        //<div style={{fontSize: '12px', color: 'rgba(0,0,0,0.5)'}}>{attr.name}</div>
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
