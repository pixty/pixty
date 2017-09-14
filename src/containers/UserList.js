import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clickUser } from '../actions';
import Users from '../components/Users';

const mapStateToProps = (state, ownProps) => ({
  users: state.entities.users
});

const mapDispatchToProps = {
  onUserClick: clickUser
};

const UserList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Users));

export default UserList;