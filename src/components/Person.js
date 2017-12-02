import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import ImageButton from './styled/ImageButton';
import { Button, CancelButton, DeleteButton } from './styled/Button';
import PersonLi from './styled/PersonLi';
import TimeAgo from 'react-timeago';
import { mainColor } from '../components/styled/Colors';
import Picture from '../components/Picture';
import Spinner from './Spinner';
import { PERSON_WIDTH } from './Constants';

const ProfileInfo = styled.div`
  overflow: hidden;
  height: 105px;
  padding: 5px 10px;
  background: ${ props => props.isSelected ? '#fff' : 'rgba(0,0,0,0.1)' };
  display: flex;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid ${props => props.active ? mainColor : 'transparent'};
  margin-right: 3px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex: 1;
`;

const PicturesContainer = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
`;

const PicturesContainerScroll = styled.div`
  width: ${props => props.count * 107 + 'px'};
  -webkit-overflow-scrolling: touch;
  cursor: zoom-out;
`;

const Match = ({id, avatarUrl, active}) => <div>
  <Avatar alt={id} src={avatarUrl || '/images/missing.png'} active={active} />
</div>;

let lastX = 1;
class Person extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      mount: false,
      showPictures: false,
      currentFaceSrc: this.props.pictures && this.props.pictures[0].url,
      pictureField: 'picURL',
      selected: false,
      currentPictureSrc: this.props.pictures && this.props.pictures[0].picURL,
      pictureIndex: 0,
      pictureCount: this.props.pictures && this.props.pictures.length  };
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

  togglePictures = (event) => {
    event.stopPropagation();
    this.setState({ showPictures: !this.state.showPictures });
  }

  toggleImageSource = el => {
    this.setState({ pictureField: this.state.pictureField === 'url' ? 'picURL' : 'url'});
  }

  ProfilePictures = ({ pictures }) => <PicturesContainer onClick={ this.togglePictures }>
    <PicturesContainerScroll count={ pictures.length }>
    { pictures.map(picture => <Avatar key={picture.id} src={picture.url} />) }
    </PicturesContainerScroll>
  </PicturesContainer>;

  ProfileAvatar = ({ url, identified, isSelected }) => <AvatarContainer>
    <Avatar src={url} />
    <div style={{ flex: 1 }}>
      { identified &&
        <div style={{display: 'flex', fontSize: '13px'}}>
          <div>
            <img src='/images/verify.svg' style={{width: '16px'}} />
          </div>
          <div style={{ marginLeft: '6px', color: mainColor }}>
            Person has profile
          </div>
        </div>
      }
      <div style={{ flex: 1 }}>
        <ImageButton type='image' title='Show Pictures' titleColor={isSelected ? '#555' : 'white'}
                onClick={ this.togglePictures }
                src={ this.state.pictureField === 'url' || isSelected ? '/images/grey_eye.svg' : '/images/eye.svg'} width='24px' />
      </div>
    </div>
  </AvatarContainer>;

  render() {

    //let attributes = this.props.profile && this.props.profile.attributes.map((a) => (<div key={a.name}><span style={{fontSize: '12px', color: '#777'}}>{a.name}</span><br/>{a.value}</div>))
    const { matches, profile, pictures, avatarUrl } = this.props;
    matches && matches.sort((a,b) => (b.id - a.id));

    const selectedId = this.props.selectedPerson.id;
    const isSelected = selectedId === this.props.id || this.state.selected;
    let startSize = 25;

    if (this.props.matchingResult !== 'identified') {
      // console.log(this.props);
    }

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
        WebkitOverflowScrolling: "touch", width: this.props.pictures && PERSON_WIDTH * this.props.pictures.length + 'px'}}>
              { this.props.pictures && this.props.pictures.map((pic, index)=> <Picture index={index} leftTop={pic.rect.leftTop}
                containerWidth={PERSON_WIDTH} pictureField={this.state.pictureField}
                rightBottom={pic.rect.rightBottom} key={pic.id} width={PERSON_WIDTH}
                placeholder={<Spinner noLabel />} src={pic[this.state.pictureField]} /> )}
            </div>
          </div>

          <ProfileInfo isSelected={isSelected}>
            {
              this.state.showPictures ?
                this.ProfilePictures({ pictures: pictures }) :
                this.ProfileAvatar({
                  url: profile && profile.avatarUrl || avatarUrl,
                  identified: this.props.matchingResult === 'identified',
                  isSelected: isSelected
                })
            }
          </ProfileInfo>

          <div style={{padding: '10px 20px', paddingRight: '10px', fontSize: '14px', fontWeight: 'normal',
          color: isSelected ? '#444' : '#fff',
          background: isSelected ? '#fff' : 'rgba(0,0,0,0.1)', borderBottom: `1px solid rgba(0,0,0,0.2)`}}>

            <div style={{float:'right', textAlign: 'right'}}>
              <ImageButton type='image' title='Edit' titleColor={isSelected ? '#555' : 'white'}
                onClick={(event) => { event.stopPropagation(); this.props.onClick(); }}
                src={ isSelected ? '/images/grey_write.svg' : '/images/write.svg' } width='24px' />
            </div>

            <div style={{float:'right', textAlign: 'right'}}>
              <ImageButton type='image' title={ this.state.pictureField === 'url' ? 'Scene' : 'Face' } titleColor={isSelected ? '#555' : 'white'}
                onClick={(event) => { event.stopPropagation(); this.toggleImageSource(event);}}
                src={ this.state.pictureField === 'url' || isSelected ? '/images/grey_eye.svg' : '/images/eye.svg'} width='24px' />
            </div>

            <div style={{fontSize: '11px', opacity: 0.5}}>Last seen at</div>
            <div><TimeAgo date={this.props.lastSeenAt} /></div>
          </div>

          {
            this.props.matchingResult !== 'identified' &&
            <div style={{background: mainColor, color: 'white', padding: '5px 10px', textAlign: 'center', fontSize: '13px'}}>
              We have several matches for the person. ({matches && matches.length})
            </div>
          }

          <div style={{padding: '0px 20px', fontSize: '14px', fontWeight: 'normal', lineHeight: '150%', wordWrap: 'break-word'}}>
            <div style={{marginTop: '0px', fontWeight: 'normal', wordWrap: 'break-word'}}>
              <div style={{fontWeight: 'light', fontSize: '13px', marginTop: '10px'}}>
                { this.props.matchingResult !== 'identified' &&
                  <div style={{ display: 'flex' }}>
                    {matches && this.props.matchingResult !== 'identified' &&
                      matches.map( (match, index) => <Match key={match.id} active={index === 1 ? true : false} {...match} />)}
                  </div>
                }
              </div>

              { this.props.profile && this.props.profile.attributes && this.props.profile.attributes.map((attr) => <div key={attr.value}>
                <div style={{ opacity: 0.3, fontSize: '12px'}}>
                  {attr.name}
                </div>
                <div style={{lineHeight: '120%', marginTop: '4px', fontSize: startSize+'px', whiteSpace: 'pre-line' }}>{(startSize -= 5) && attr.value }</div>
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