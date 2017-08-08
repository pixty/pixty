import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Person from './Person'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
})

class Persons extends React.Component {
//const Persons = ({ persons, pictures, profiles, onClick, selectedPerson }) => {  

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    })
  }
  // <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
  render() {
    const { persons, pictures, profiles, onClick, selectedPerson } = this.props;
    return (   
      <div style={{margin: '0px', marginTop: '20px', padding: '0px', width: "100%",
                  background: '#333', overflowX: 'scroll',
                  overflowScrolling: "touch", WebkitOverflowScrolling: "touch"
                }}>        
        <ul>        
          { _.map(persons, person =>
            <Person key={person.id}
              {...person}
              onClick={() => onClick({ id: person.id, selected: person})}
              name={person.profile ? profiles[person.profile].attributes.name : person.id}
              selectedId={selectedPerson.id}      
              pictures={ _.map(person.pictures, id => ( pictures[id] ))}  
            />        
          )}
        </ul>          
      </div>
    )
    }
}

Persons.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Persons