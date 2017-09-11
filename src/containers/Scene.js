import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Scene from '../components/Scene'

const mapStateToProps = (state, ownProps) => ({
  scene: state.entities.scene,
  selectedPerson: state.selectedPerson
})

const mapDispatchToProps = {
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Scene))