import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

class Picture extends React.PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
    placeholder: PropTypes.object,
    imgClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    holderClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    placeholderProps: PropTypes.object,
    onClick: PropTypes.func,
    alt: PropTypes.string,
  }

  state = {
    loaded: false,
  }

  setLoaded = loaded => {
    this.setState({ loaded: true });
  }


  render() {
    const {
      placeholder,
      src,
      alt,
      ...props
    } = this.props;

    return (
      <div style={{width: '320px', height: '180px', float: 'left'}}>
        { !this.state.loaded &&
        <div style={{marginLeft: '156px', marginTop: '90px'}}>
          {placeholder }
        </div> }
          <img src={src} alt={alt} style={{width: '320px', height: '180px', opacity: this.state.loaded ? 1 : 0}} onLoad={() => this.setLoaded(true)} />
      </div>
    );
  }
}



export default Picture;