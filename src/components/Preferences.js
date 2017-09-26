import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main } from './styled/Main';
import TopMenu from './TopMenu';
import Modals from '../containers/Modals';
import { TabMenu, TabItem } from './TabMenu';
import { AccountSettings, BillingSettings } from './Settings';

const Unkown = () => <div style={{color: '#555', fontSize: '12px'}}>Route not found</div>;

class Preferences extends React.Component {


  renderSelectedComponent = (active) => {
    let Component;
    switch(active) {
      case 'account':
        Component = <AccountSettings />;
        break;
      case 'billing':
        Component = <BillingSettings   />;
        break;
      default:
        Component = <Unkown />;
    }
    return Component;
  }

  render() {
    return (
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '100%', overflow: 'hidden', color: 'white'}}>
        <Modals />

        <Main right={'0px'} margin={'0px'}>
          <TopMenu />

          <div style={{paddingLeft: '15px', borderBottom: '1px solid #444'}}>
            <h2>Preferences</h2>

            <TabMenu active={this.props.match.params.prefName}>
              <TabItem name='Account' path="/preferences/account" id="account" />
              <TabItem name='Billing' path="/preferences/billing" id="billing" />
              <TabItem name='Security' path="/preferences/security" id="security" />
              <TabItem name='Organization' path="/preferences/organization" id="organization" />
            </TabMenu>
          </div>

          <div style={{position: 'absolute', overflow: 'auto', top: '146px', left: 0,
          overflowScrolling: "touch", WebkitOverflowScrolling: "touch",
          right: 0, bottom: 0}}>
            <div style={{padding: '20px'}}>
              { this.renderSelectedComponent(this.props.match.params.prefName) }
            </div>
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