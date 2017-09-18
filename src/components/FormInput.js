import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  background: none;
  -webkit-appearance: none;
  font-size: medium;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  color: white;
  outline: none;
  width: 100%;
  font-family: 'Source Sans Pro', sans-serif;
  transition: all 0.3s ease-out 0.06s;
  padding: 5px 0px;
  &:focus {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const Wrapper = styled.div`
  line-height: 170%;
  opacity: ${props => props.show ? 1.0 : 0.0};
  height: ${props => props.show ? '60px' : 0};
  transition: all 0.5s ease-out;
`;

class FormInput extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    this.setState(() => (setTimeout(()=>{ this.setState({show: true}); }, 100)));
  }

  render() {
    const inputType = this.props.password ? 'password' : 'text';

    return (
      <Wrapper show={this.state.show}>
        <label style={{color: 'rgba(255,255,255,0.4)', fontSize: 'small'}}>
          {this.props.label}<br/>
          <Input type={inputType} spellCheck="false" autoCorrect="off" autoCapitalize="off" value={this.props.value} onChange={this.props.onChange} />
        </label>
      </Wrapper>
    );
  }
}

export default FormInput;