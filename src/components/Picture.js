import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

class Picture extends React.Component {

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
    offsetTop: 90,
    divHeight: 180
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src != this.props.src) {
      this.setState({loaded: false});
    }
  }

  setLoaded = el => {
    this.setState({ loaded: true, offsetTop: el.target.offsetHeight/2, divHeight: el.target.offsetHeight });
  }


  render() {
    const {
      placeholder,
      src,
      alt,
      width,
      ...props
    } = this.props;

    return (
      <div style={{width: width + 'px', float: 'left', height: this.state.divHeight + 'px', transition: '0.2s ease'}}>
        { !this.state.loaded &&
        <div style={{marginLeft: width/2 + 'px', marginTop: this.state.offsetTop + 'px'}}>
          {placeholder}
        </div> }
        <img src={src} alt={alt} style={{width: width + 'px', opacity: this.state.loaded ? 1 : 0}} onLoad={(el) => this.setLoaded(el)} />
      </div>
    );
  }
}



export default Picture;