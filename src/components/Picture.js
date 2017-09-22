import React from 'react';
import PropTypes from 'prop-types';
import { mainColor } from './styled/Colors';
import _ from 'lodash';

class Picture extends React.PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
    placeholder: PropTypes.object,
    imgClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    holderClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    placeholderProps: PropTypes.object,
    onClick: PropTypes.func,
    alt: PropTypes.string,
    rect: PropTypes.object,
    leftTop: PropTypes.object,
    rightBottom: PropTypes.object
  }

  state = {
    loaded: false,
    offsetTop: 90,
    divHeight: 180,
    divWidth: 320,
    faceLeft: 0,
    faceTop: 0,
    faceWidth: 0,
    faceHeight: 0
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({loaded: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
  }

  setLoaded = (event) => {

    const naturalWidth = event.target.naturalWidth,
          naturalHeight = event.target.naturalHeight,
          imageWidth = event.target.width,
          imageHeight = event.target.height,
          faceX = this.props.leftTop.x,
          faceY = this.props.leftTop.y,
          naturalFaceWidth = this.props.rightBottom.x - this.props.leftTop.x,
          naturalFacefHeight = this.props.rightBottom.y - this.props.leftTop.y;

    const aspectRatioX = imageWidth / naturalWidth;
    const aspectRatioY = imageHeight / naturalHeight;

    const faceLeft = faceX * aspectRatioX / 2;
    const faceTop = faceY * aspectRatioY / 2;
    const faceWidth = naturalFaceWidth * aspectRatioX / 1.15;
    const faceHeight = naturalFacefHeight * aspectRatioY / 1.15;

    console.log({faceLeft:faceLeft, faceTop:faceTop, naturalWidth:naturalWidth, naturalHeight:naturalHeight,
     imageWidth:imageWidth, imageHeight:imageHeight, faceX:faceX, faceY:faceY, faceWidth:faceWidth, faceHeight:faceHeight,
     aspectRatioX:aspectRatioX, aspectRatioY:aspectRatioY });

    if (this.props.pictureField === 'picURL') {
      this.setState({ loaded: true, offsetTop: event.target.offsetHeight/2,
        faceLeft: faceLeft, faceTop: faceTop, faceWidth: faceWidth * aspectRatioX, faceHeight: faceHeight * aspectRatioY,
        divHeight: event.target.offsetHeight, divWidth: event.target.offsetWidth});
    } else {
      this.setState({ loaded: true, offsetTop: event.target.offsetHeight/2,
        divHeight: event.target.offsetHeight, divWidth: event.target.offsetWidth});
    }
  }

  render() {
    const {
      placeholder,
      src,
      alt,
      width,
      leftTop,
      rightBottom,
      index,
      containerWidth,
      pictureField
    } = this.props;

    return (
      <div style={{position: 'relative'}}>
        { pictureField === 'picURL' &&
          <div style={{left: this.state.faceLeft, top: this.state.faceTop, position: 'absolute', transition: '0.5s ease',
          width: this.state.faceWidth, height: this.state.faceHeight,
          border: `1px solid ${mainColor}`, borderRadius: '2px', boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.6), inset 0px 0px 0px 1px rgba(0,0,0,0.1)'}}>
              &nbsp;
          </div>
        }
        <div style={{width: width + 'px', height: this.state.divHeight + 'px', transition: '0.2s ease'}}>
          { !this.state.loaded &&
          <div style={{marginLeft: width/2 + 'px', marginTop: this.state.offsetTop + 'px'}}>
            {placeholder}
          </div> }
          <img src={src} alt={alt} style={{width: width + 'px', opacity: this.state.loaded ? 1 : 0}} onLoad={(event) => this.setLoaded(event)} />
        </div>
      </div>
    );
  }
}

export default Picture;