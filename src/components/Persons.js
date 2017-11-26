import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import Person from './Person';
//import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { PERSON_WIDTH } from './Constants';

/*

  TBD:

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

*/

const Analyzing = styled.div`
  width: 300px;
  height: 225px;
  background: url('/images/swim.gif');
  background-blend-mode: screen;
  background-color: #222122;
  background-size: 100% 100%;
`;

class Persons extends React.Component {

  /*
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }*/

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    scene: PropTypes.object.isRequired,
    selectedPerson: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { persons: 0 };
  }

  componentWillReceiveProps(props) {
    const { scene } = props;
    const persons = scene.persons;
    const size = _.size(persons);

    if (this.state.persons != size) {
      let scroll_left = (_.size(persons) - 1) * (PERSON_WIDTH + 10);
      this.setState({ persons: size });
      //this.refs.scroll_content.scrollLeft = scroll_left;
    }
  }

  render() {
    const { scene, onClick, selectedPerson, getProfile } = this.props;
    const persons = scene.persons;
    const div_width = (_.size(persons) + 1) * (PERSON_WIDTH + 10);

    return (
      <div style={{margin: '0px', padding: '0px', right: '0px', left: '0px',
                  background: '', overflow: 'hidden', position: 'absolute', top: this.props.isElectron ? '70px' : '50px', bottom: '0px', justifyContent: 'center',
                  display: 'flex'
                }}>
        <div ref='scroll_content' style={{overflowX: 'auto', overflowScrolling: "touch", height: '100%',
        WebkitOverflowScrolling: "touch", overflowY: 'hidden', margin: '0px', scrollBehavior: 'smooth',
        flexShrink: 1, padding: '0px'}}>
          <ul style={{height: '98%', width: div_width + 5 + 'px', display: 'flex', marginLeft: '10px'}}>
            { _.map(persons, person =>
              <Person key={person.id}
                id={person.id}
                selectedPerson={selectedPerson}
                onClick={() => onClick({ id: person.id, selected: person})}
                getProfile={() => getProfile(person.id) }
                {...person}
              />
            )}
            <li style={{width: PERSON_WIDTH + 'px', height: '100%',
                border: 'none', marginRight: '10px',
                display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Analyzing />
              &nbsp;
            </li>
          </ul>
        </div>
      </div>
    );
    }
}

export default Persons;