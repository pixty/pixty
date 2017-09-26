import React from 'react';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import FormInput from '../FormInput';
import { CancelButton, Button } from '../styled/Button';
import { CurrentUser } from '../../api';
import { Header, Info } from './Header';

class CompanySettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { old_password: null, org: {name: null, country: null}};
  }

  onChange() {
    this.setState({ [arguments[0]] : arguments[1].target.value });
  }

  render() {
    const user = CurrentUser.getUser();

    return(
        <div>
          <Header>Billing adress</Header>
          <Info><b>Tip:</b> Two-factor authentication provides another layer of security to your account.</Info>
          <Row>
            <Col xs={12} md={3}>
              <FormInput noAnimation onChange={this.onChange.bind(this, 'org.name')} label="Company Name" />
            </Col>
            <Col xs={12} md={2}>
              <FormInput noAnimation value='United Stated' onChange={this.onChange.bind(this, 'org.country')} label="Counrty" />
            </Col>
            <Col xs={12} md={1}>
              <FormInput noAnimation onChange={this.onChange.bind(this, 'org.zip_code')} label="Zip Code" />
            </Col>
            <Col xs={12} md={2}>
              <FormInput noAnimation onChange={this.onChange.bind(this, 'org.state')} label="State" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <FormInput noAnimation onChange={this.onChange.bind(this, 'org.address')} label="Address" />
            </Col>
            <Col xs={12} md={2}>
              <FormInput noAnimation onChange={this.onChange.bind(this, 'org.phone')} label="Phone" />
            </Col>
            <Col xs={12} md={2}>
              <FormInput noAnimation onChange={this.onChange.bind(this, 'org.fax')} label="Fax" />
            </Col>
          </Row>

          <Row style={{paddingTop: '15px', paddingBottom: '30px'}}>
            <Col xs={12} md={3} style={{marginTop: '4px'}}>
              <Button size="14px">Save</Button>
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

export default CompanySettings;



