import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.textarea`
  border: none;
  background: none;
  font-size: medium;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  color: white;
  outline: none;
  width: 100%;
  resize: none;
  overflow: hidden;
  height: ${props => props.show ? props.height : 0};
  font-family: 'Source Sans Pro', sans-serif;
  transition: all ease-out 0.4s;
  border-radius: 0px;
  -moz-appearance: none;
  -webkit-appearance: none;
  padding: 5px 0px;
  &:focus {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const Wrapper = styled.div`
  line-height: 170%;
  opacity: ${props => props.show ? 1.0 : 0.0};
  height: ${props => props.show ? 'auto' : 0};
  display: block;
`;

class FormAreaInput extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { show: false, height: 0 };
  }

  componentDidMount() {
    this.setState(() => (setTimeout(()=>{ this.setState({show: true, height: this.textInput.scrollHeight - 10}); }, 50)));
  }

  onChange = (event) => {

    if (this.state.height < event.target.scrollHeight - 10) {
      this.setState({ height: this.textInput.scrollHeight - 10 });
      console.log(event.target);
    }
    this.props.onChange.call(this, event);
  }

  render() {
    const inputType = this.props.password ? 'password' : 'text';

    return (
      <Wrapper show={this.state.show} >
        <label style={{color: 'rgba(255,255,255,0.4)', fontSize: 'small'}}>
          {this.props.label}<br/>
          <Input innerRef={(input) => { this.textInput = input; }} show={this.state.show} type={inputType}
          height={this.state.height+'px'} spellCheck="false" autoCorrect="off" autoCapitalize="off"
          value={this.props.value} onChange={this.onChange} />
        </label>
      </Wrapper>
    );
  }
}

export default FormAreaInput;