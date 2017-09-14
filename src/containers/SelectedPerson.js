import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectedPerson from '../components/SelectedPerson';

const mapStateToProps = (state, ownProps) => ({
  scene: state.entities.scene,
  selectedPerson: state.selectedPerson
});

const mapDispatchToProps = {
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPerson));