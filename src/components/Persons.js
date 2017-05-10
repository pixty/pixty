import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Person from './Person'


const Persons = ({ persons, pictures, profiles, onClick, selectedPerson }) => {
  return (   
    <div style={{margin: '0px', padding: '10px', width: "100%",
                background: '#333', overflowX: 'scroll',
                overflowScrolling: "touch", WebkitOverflowScrolling: "touch"
              }}>      
      <ul style={{overflow: 'hidden', width: (_.keys(persons).length * 680) + "px"}}>
        { _.map(persons, person =>
          <Person key={person.id}
            {...person}
            onClick={() => onClick({ id: person.id, selected: selectedPerson})}
            name={person.profile ? profiles[person.profile].attributes.name : person.id}
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