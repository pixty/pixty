import React, { PropTypes } from 'react'
import _ from 'lodash'


class Person extends React.Component {

  render() {
    return (
      <li title={this.props.name} onClick={this.props.onClick} style={{
        borderColor: this.props.selectedId === this.props.id ? 'green' : 'white',
        cursor: 'pointer',
        border: '3px solid white',
        margin: '4px',
        padding: '0px',
        overflow: 'auto',
        width: '100px',
        height: '100px',
        float: 'left'
      }}>

      { _.map(this.props.pictures, pic =>
        <div key={pic.id}>
          <img alt={ pic.id } src={ pic.url }  style={{ width: '100px', height: '100px'}}/>
        </div>
      )}
    </li>
    )
  }
}

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,  
}

export default Person
