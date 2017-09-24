import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main } from './styled/Main';
import TopMenu from './TopMenu';
import Modals from '../containers/Modals';
import StyledLink from './styled/Link';

class Preferences extends React.Component {

  render() {
    return (
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '100%', overflow: 'hidden', color: 'white'}}>
        <Modals />

        <Main right={'0px'} margin={'0px'}>
          <TopMenu />

          <div style={{paddingLeft: '15px', borderBottom: '1px solid #444'}}>
          <h2>Preferences</h2>
          </div>

          <div style={{paddingLeft: '15px'}}>
            <p>Selected: {this.props.match.params.prefName}</p>


            <StyledLink to="/preferences/account">Account</StyledLink>
            <StyledLink to="/preferences/security">Security</StyledLink>
            <StyledLink to="/preferences/organization">Orgatization</StyledLink>
            <StyledLink to="/preferences/billing">Billing</StyledLink>

          </div>

        </Main>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences));