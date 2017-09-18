import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Scene from '../components/Scene';
import { setSettings } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  scene: state.entities.scene,
  selectedPerson: state.selectedPerson,
  settings: state.entities.settings
});

const mapDispatchToProps = {
  setUserSettings: setSettings
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Scene));