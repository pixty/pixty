import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clickPerson, getProfile } from '../actions';
import Persons from '../components/Persons';

const mapStateToProps = (state, ownProps) => ({
  scene: state.entities.scene,
  selectedPerson: state.selectedPerson
});

const mapDispatchToProps = {
  onClick: clickPerson,
  getProfile: getProfile
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons));