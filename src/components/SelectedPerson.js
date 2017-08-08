import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import logo from '../logo.svg'
import TimeAgo from 'react-timeago'


const currentPerson = (person, profile) => ( 
    <div>
      { _.isEmpty(profile) ?
        <p>
          <img src={logo} className="App-logo" alt="logo" />
        </p>
        :
        <div>
          <div style={{fontSize:"18px", fontWeight: 'bold', padding: "10px 0px"}}>{profile.attributes.name}</div>
          Id: {profile.id}<br/>
          occuracy: {profile.occuracy}<br/>
        </div>
      } 

      <div style={{fontSize: "11px", position: "", bottom: "30px"}}>
      Id: {person.id}<br/>
      capturedAt: <TimeAgo date={person.capturedAt} /><br/>
      lostAt: <TimeAgo date={person.lostAt} /><br/>
      </div>
    </div>
  )

class SelectedPerson extends React.Component {
  render() {
    let person, profile
    
    if (this.props.selectedPerson) {
      person = this.props.selectedPerson
      profile = this.props.profiles[person.profile]
    }

    return (
      <div style={{position: 'relative', zIndex: '2'}}>
        <div style={{position: '', padding: "10px", width: "640px", height: "360px"}}>
          { this.props.selectedPerson ? currentPerson(person, profile) :'' }
        </div>
      </div>
    )
  }
}

SelectedPerson.propTypes = {  
  //id: PropTypes.string.isRequired
}

export default SelectedPerson