import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import logo from '../logo.svg';
import TimeAgo from 'react-timeago';


const currentPerson = (person, profile) => (
    <div style={{opacity: 0.3, fontSize: '12px', marginTop: '15px'}}>
      { _.isEmpty(profile) ?
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          avatarUrl: {profile.avatarUrl}<br/>
          Id: {profile.id}<br/>
          orgId: {profile.orgId}<br/>
        </div> : ''
      }

      <div>
        {person.id}<br/>
      </div>
    </div>
  );

class SelectedPerson extends React.Component {
  render() {
    let person, profile;

    if (this.props.selectedPerson) {
      person = this.props.selectedPerson;
      profile = person.profile;
    }

    return (
      <div>
        { this.props.selectedPerson ? currentPerson(person, profile) : '' }
      </div>
    );
  }
}

SelectedPerson.propTypes = {
  //id: PropTypes.string.isRequired
};

export default SelectedPerson;