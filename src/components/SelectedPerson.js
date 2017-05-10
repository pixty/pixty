import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import logo from '../logo.svg'


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

      <div style={{fontSize: "11px", position: "absolute", bottom: "30px"}}>
      Id: {person.id}<br/>
      capturedAt: {person.capturedAt}<br/>
      lostAt: {person.lostAt}<br/>
      </div>
    </div>
  )

class SelectedPerson extends React.Component {
  render() {
    let person, profile
    
    if (this.props.selectedPerson) {
      person = this.props.persons[this.props.selectedPerson]
      profile = this.props.profiles[person.profile]
      console.log('profile=',profile)
    }

    return (
      <div style={{position: 'relative', zIndex: '2'}}>
        <div style={{position: 'absolute', padding: "10px", width: "640px", height: "360px"}}>
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