import React, { PropTypes } from 'react'
import _ from 'lodash'
import Person from './Person'

const Persons = ({ persons, pictures, profiles, onClick, selectedPerson }) => {

  return (   
    <div style={{margin: '0px', padding: '0px', width: "100%", display: 'table', background: '#222'}}>
      <ul>            
        { _.map(persons, person =>
          <Person key={person.id}
            {...person}
            onClick={() => onClick({ id: person.id, selected: selectedPerson})}
            name={person.profile ? profiles[person.profile].attributes.name : "?"}
            selectedId={selectedPerson}      
            pictures={ _.map(person.pictures, id => ( pictures[id] ))}
          />        
        )}    
      </ul>
    </div>
)
}

Persons.propTypes = {
  onClick: PropTypes.func.isRequired
}

Persons.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Persons