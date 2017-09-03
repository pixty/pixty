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
    const { persons, pictures, profiles, onClick, selectedPerson, getProfile } = this.props;
    const div_width = _.size(persons) * 360;

    return (
      <div style={{margin: '0px', marginTop: '20px', padding: '0px', width: '100%',
                  background: '', overflowX: 'scroll',
                  overflowScrolling: "touch", WebkitOverflowScrolling: "touch"
                }}>
        <div style={{width: div_width + 'px', overflow: 'hidden'}}>
        <ul>
          { _.map(persons, person =>
            <Person key={person.id}
              {...person}
              profile={profiles['1']}
              onClick={() => onClick({ id: person.id, selected: person})}
              getProfile={() => getProfile(person.id) }
              name={person.profile ? profiles[person.profile].attributes.name : person.id}
              selectedId={selectedPerson.id}
              pictures={ _.map(person.pictures, id => ( pictures[id] ))}
            />
          )}
        </ul>
        </div>
      </div>
    )
    }
}

Persons.propTypes = {
  onClick: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired
}

export default Persons