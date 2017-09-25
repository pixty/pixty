import React from 'react';
import styled from 'styled-components';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import FormInput from '../FormInput';
import { CancelButton, Button } from '../styled/Button';

const Header = styled.div`
  color: #555;
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
  margin-bottom: 20px;
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
        <div>
          <Header>Change password</Header>
          <Row>
            <Col xs={12} md={3}>
              <FormInput password onChange={this.onChange.bind(this, 'old_password')} label="Old Password"></FormInput>
            </Col>
            <Col xs={12} md={3}>
              <FormInput password onChange={this.onChange.bind(this, 'new_password')} label="New Password"></FormInput>
            </Col>
            <Col xs={12} md={3}>
              <FormInput password onChange={this.onChange.bind(this, 'password_confirmation')} label="Password Confirmation"></FormInput>
            </Col>
          </Row>
          <Row style={{paddingTop: '15px', paddingBottom: '30px'}}>
            <Col xs={12}>
              <Button size="14px">Update Password</Button>
            </Col>
          </Row>

          <Header>Change email</Header>

          <Row>
            <Col xs={12} md={3}>
              <FormInput onChange={this.onChange.bind(this, 'email')} label="Primary Email"></FormInput>
            </Col>
            <Col xs={12} md={3}>
              <FormInput onChange={this.onChange.bind(this, 'email')} label="Secondary Email"></FormInput>
            </Col>
          </Row>

          <Row style={{paddingTop: '15px', paddingBottom: '30px'}}>
            <Col xs={12}>
              <CancelButton size="14px">Save</CancelButton>
            </Col>
          </Row>
      </div>
    );
  }
}

export default AccountSettings;
