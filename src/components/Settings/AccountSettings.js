import React from 'react';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import FormInput from '../FormInput';
import { CancelButton, Button } from '../styled/Button';
import { CurrentUser } from '../../api';
import { Header } from './Header';

class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { old_password: null, new_password: null, password_confirmation: null, email: null };
  }

  onChange() {
    this.setState({ [arguments[0]] : arguments[1].target.value });
  }

  render() {
    const user = CurrentUser.getUser();

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
              <FormInput value={user.email} onChange={this.onChange.bind(this, 'email')} label="Primary Email" />
            </Col>
            <Col xs={12} md={3}>
              <FormInput onChange={this.onChange.bind(this, 'email')} label="Secondary Email" />
            </Col>
          </Row>

          <Row style={{paddingTop: '15px', paddingBottom: '30px'}}>
            <Col xs={12}>
              <Button size="14px">Save</Button>
            </Col>
          </Row>
      </div>
    );
  }
}

export default AccountSettings;
