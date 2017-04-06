import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { clickPerson } from '../actions'
import Persons from '../components/Persons'

const mapStateToProps = (state, ownProps) => ({
  persons: state.entities.persons,
  profiles: state.entities.profiles,
  pictures: state.entities.pictures,
  selectedPerson: state.selectedPerson
})

const mapDispatchToProps = {
  onClick: clickPerson
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons))