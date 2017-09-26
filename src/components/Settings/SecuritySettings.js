import React from 'react';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import FormInput from '../FormInput';
import { CancelButton, Button } from '../styled/Button';
import { CurrentUser } from '../../api';
import { Header, Info } from './Header';

class SecuritySettings extends React.Component {

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
          <Header>Two-factor authentication</Header>
          <Row>
            <Col xs={12} md={3}>
              <Info>Two-factor authentication provides another layer of security to your account.</Info>
              Status: Off
            </Col>
            <Col xs={12} md={3}>
              <Header>Sessions</Header>
              <Info>
              This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.
              </Info>
              93.80.135.111 – Your current session
            </Col>
          </Row>
          <Row style={{paddingTop: '15px', paddingBottom: '30px'}}>
            <Col xs={12} md={3} style={{marginTop: '4px'}}>
              <CancelButton size="14px">Setup Two-Factor Authentication</CancelButton>
            </Col>
          </Row>

          <Header>Security history</Header>
          <Info>
            This is a security log of important events involving your account.
          </Info>

          <Row style={{fontSize: '14px', color: '#777'}}>
            <Col xs={12} md={6}>
              user.login – Originated from 93.80.135.111
            </Col>
            <Col xs={12} md={6}>
              16 days ago
            </Col>
          </Row>

      </div>
    );
  }
}

export default SecuritySettings;


