import React from 'react';
import styled from 'styled-components';
import FormInput from '../FormInput';
import { CancelButton } from '../styled/Button';

const Header = styled.div`
  color: #555;
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  & > div {
    margin-right: 15px;
    flex: 1;
  }
`;

class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { old_password: null, new_password: null, password_confirmation: null, email: null };
  }

  onChange() {
    this.setState({ [arguments[0]] : arguments[1].target.value });
  }

  render() {
    return(
      <div style={{marginTop: '15px', maxWidth: '900px'}}>
        <Header>Change password</Header>
        <Section>
          <FormInput password onChange={this.onChange.bind(this, 'old_password')} label="Old Password"></FormInput>
          <FormInput password onChange={this.onChange.bind(this, 'new_password')} label="New Password"></FormInput>
          <FormInput password onChange={this.onChange.bind(this, 'password_confirmation')} label="Password Confirmation"></FormInput>
        </Section>
        <div style={{margin: '15px 0px'}}>
          <CancelButton size="14px">Update Password</CancelButton>
        </div>
        <Header>Change email</Header>
        <Section>
          <FormInput onChange={this.onChange.bind(this, 'email')} label="Primary Email"></FormInput>
          <FormInput onChange={this.onChange.bind(this, 'email')} label="Secondary Email"></FormInput>
        </Section>
        <div style={{margin: '15px 0px'}}>
          <CancelButton size="14px">Save</CancelButton>
        </div>
      </div>
    );
  }
}

export default AccountSettings;
