import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Person from './Person';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { PERSON_WIDTH } from './Person';

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class Persons extends React.Component {
//const Persons = ({ persons, pictures, profiles, onClick, selectedPerson }) => {

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }
  // <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
  render() {
    const { scene, onClick, selectedPerson, getProfile } = this.props;
    const persons = scene.persons;
    const div_width = _.size(persons) * (PERSON_WIDTH + 10);

    return (
      <div style={{margin: '0px', padding: '0px', right: '0px', left: '0px',
                  background: '', overflow: 'hidden', position: 'absolute', top: '50px', bottom: '0px', justifyContent: 'center',
                  display: 'flex',
                }}>
        <div style={{overflowX: 'auto', overflowScrolling: "touch", height: '100%',
        WebkitOverflowScrolling: "touch", overflowY: 'hidden', margin: '0px',
        flexShrink: 1, padding: '0px'}}>
          <ul style={{height: '98%', width: div_width + 5 + 'px'}}>
            { _.map(persons, person =>
              <Person key={person.id}
                {...person}
                selectedPerson={selectedPerson}
                onClick={() => onClick({ id: person.id, selected: person})}
                getProfile={() => getProfile(person.id) }
              />
            )}
          </ul>
        </div>
      </div>
    );
    }
}

Persons.propTypes = {
  onClick: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired
};

export default Persons;