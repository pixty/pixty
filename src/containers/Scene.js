import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Scene from '../components/Scene'

const mapStateToProps = (state, ownProps) => ({
  scenes: state.entities.scenes,
  persons: state.entities.persons,
  pictures: state.entities.pictures,
  selectedPerson: state.selectedPerson,
})

const mapDispatchToProps = {
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Scene))