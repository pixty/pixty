import React, { PropTypes } from 'react'
import User from './User'
import _ from 'lodash'


const Users = ({ users, onUserClick }) => ( 
  <div style={{margin: '0px', padding: '0px', width: "100%", display: 'table', background: '#222'}}>
    <ul>      
      { _.map(users, user =>
        <User
          key={user.login}
          {...user}
          onClick={() => onUserClick(user.id)}
        />
      )}    
    </ul>
  </div>
)

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,    
    login: PropTypes.string.isRequired,
    selected: PropTypes.object.isRequired
  }).isRequired).isRequired,
  onUserClick: PropTypes.func.isRequired
}

Users.propTypes = {
  onUserClick: PropTypes.func.isRequired
}

export default Users