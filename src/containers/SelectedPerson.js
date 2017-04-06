import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SelectedPerson from '../components/SelectedPerson'

const mapStateToProps = (state, ownProps) => ({   
  persons: state.entities.persons,
  profiles: state.entities.profiles,
  selectedPerson: state.selectedPerson
})

const mapDispatchToProps = {
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPerson))