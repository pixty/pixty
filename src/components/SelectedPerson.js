import React, { PropTypes } from 'react'
import _ from 'lodash'
import logo from '../logo.svg'


const currentPerson = (person, profile) => ( 
    <div>
      Id: {person.id}<br/>
      capturedAt: {person.capturedAt}<br/>
      lostAt: {person.lostAt}<br/>
      <br/>
            
      { _.isEmpty(profile) ?
        <p>
          <img src={logo} className="App-logo" alt="logo" />
        </p>
        :
        <div>
          <h2>{profile.attributes.name}</h2>
          Id: {profile.id}<br/>
          occuracy: {profile.occuracy}<br/>
        </div>
      }      
          
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
      <div style={{background: 'white', padding: '20px', color: 'black'}}>
        { this.props.selectedPerson ? currentPerson(person, profile) :'No Selected'
        }
      </div>
    )
  }
}

SelectedPerson.propTypes = {  
  //id: PropTypes.string.isRequired
}

export default SelectedPerson