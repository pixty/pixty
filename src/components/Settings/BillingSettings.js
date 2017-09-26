import React from 'react';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import FormInput from '../FormInput';
import { CancelButton, Button } from '../styled/Button';
import { CurrentUser } from '../../api';
import { Header } from './Header';

class BillingSettings extends React.Component {

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
          <Header>Billing overview</Header>
          <Row>
            <Col xs={12} md={3}>
              <Header>Plan</Header>
              Starter – $47.00 monthly
            </Col>
            <Col xs={12} md={3}>
              <Header>Payment</Header>
              MasterCard 5*** **** **** 2817 Expiration: 2/2021 Next payment due: 2017-10-24<br/>
              Change to yearly billing
            </Col>
            <Col xs={12} md={3}>
              <Header>Coupon</Header>
              You don’t have an active coupon.
            </Col>
          </Row>
          <Row style={{paddingTop: '15px', paddingBottom: '30px'}}>
            <Col xs={12} md={3} style={{marginTop: '4px'}}>
              <CancelButton size="14px">Change Plan</CancelButton>
            </Col>
            <Col xs={12} md={3} style={{marginTop: '4px'}}>
              <CancelButton size="14px">Update Payment Method</CancelButton>
            </Col>
            <Col xs={12} md={3} style={{marginTop: '4px'}}>
              <CancelButton size="14px">Redeem a Coupon</CancelButton>
            </Col>
          </Row>

          <Header>Payment History</Header>

          <Row>
            <Col xs={1}>
              <Header>ID</Header>
            </Col>
            <Col xs={1}>
              <Header>Date</Header>
            </Col>
            <Col xs={4}>
              <Header>Payment method</Header>
            </Col>
            <Col xs={2}>
              <Header>Ammount</Header>
            </Col>
            <Col xs={2}>
              <Header>Receipt</Header>
            </Col>
          </Row>

          <Row style={{fontSize: '14px', color: '#777'}}>
            <Col xs={1}>
              JDKANX3C
            </Col>
            <Col xs={1}>
              2017-09-24
            </Col>
            <Col xs={4}>
              MasterCard ending in 2817
            </Col>
            <Col xs={2}>
              $47.00
            </Col>
            <Col xs={2}>
              <img src='/images/download.svg' style={{width: '20px'}} />
            </Col>
          </Row>

      </div>
    );
  }
}

export default BillingSettings;

