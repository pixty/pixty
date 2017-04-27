import React, { PropTypes } from 'react'
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

      <span style={{fontSize: "12px"}}>
      Id: {person.id}<br/>
      capturedAt: {person.capturedAt}<br/>
      lostAt: {person.lostAt}<br/>
      </span>
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
        <div style={{position: 'absolute', padding: "10px", background: "rgba(0,0,0,0.6)"}}>
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