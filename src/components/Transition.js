import React from 'react';
import PropTypes from 'prop-types';

class Transition extends React.Component {
  static PropTypes = {
    context: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { opacity: 0, delay: '0.5s' };
  }

  componentDidMount() {
    this.setState({opacity: 1});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({opacity: 0, delay: '0s'});
    setTimeout(() => { this.setState({opacity: 1, delay: '0.5s'});}, 0);
  }

  render() {
    return (
      <div style={{opacity: this.state.opacity, transition: `opacity ${this.state.delay} ease`}}>
        {this.props.context}
      </div>
    );
  }
}

export default Transition;
