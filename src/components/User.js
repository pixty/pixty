import React, { PropTypes } from 'react'


class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selected: false}
  }

  handleClick() {
    this.setState({ selected: !this.state.selected})
    //this.props.onClick()
  }

  render() {
    return (
      <li onClick={this.handleClick.bind(this)} style={{
        borderColor: this.state.selected ? 'green' : 'white',
        cursor: 'pointer',
        border: '3px solid white',
        margin: '4px',
        padding: '0px',
        overflow: 'hidden',
        width: '100px',
        height: '100px',
        float: 'left'
      }}>
      <img alt='{this.props.login}' src={this.props.avatarUrl} style={{width: '100px'}}/>      
    </li>
    )
  }
}

User.propTypes = {
  onClick: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  selected: PropTypes.bool
}

export default User
