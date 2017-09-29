import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main } from './styled/Main';
import TopMenu from './TopMenu';
import Modals from '../containers/Modals';
import { TabMenu, TabItem } from './TabMenu';
import { AccountSettings, BillingSettings, SecuritySettings, CompanySettings } from './Settings';
import Transition from './Transition';

const Unkown = () => <div style={{color: '#555', fontSize: '12px'}}>Route not found</div>;

class Preferences extends React.Component {

  constructor() {
    super();
    const isElectron = window && window.process && window.process.type;
    this.state = {isElectron: isElectron };
  }

  renderSelectedComponent = (active) => {
    let Component;
    switch(active) {
      case 'account':
        Component = <AccountSettings />;
        break;
      case 'billing':
        Component = <BillingSettings />;
        break;
      case 'security':
        Component = <SecuritySettings />;
        break;
      case 'organization':
        Component = <CompanySettings />;
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
          <TopMenu isElectron={this.state.isElectron} />

          <div style={{paddingLeft: '15px', borderBottom: '1px solid #444'}}>
            <h2>Preferences</h2>

            <TabMenu active={this.props.match.params.prefName}>
              <TabItem name='Account' path="/preferences/account" id="account" />
              <TabItem name='Billing' path="/preferences/billing" id="billing" />
              <TabItem name='Security' path="/preferences/security" id="security" />
              <TabItem name='Organization' path="/preferences/organization" id="organization" />
            </TabMenu>
          </div>

          <div style={{position: 'absolute', overflow: 'auto', top: this.state.isElectron ? 146+16+'px' : '146px', left: 0,
          overflowScrolling: "touch", WebkitOverflowScrolling: "touch",
          right: 0, bottom: 0}}>
            <div style={{padding: '20px'}}>
              <Transition context={ this.renderSelectedComponent(this.props.match.params.prefName) } />
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