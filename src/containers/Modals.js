import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as api from '../api'
import _ from 'lodash'
import styled from 'styled-components'
import { closeModal } from '../actions'
import Dialog from './Dialog'

class Modals extends React.PureComponent {
  static propTypes = {
    modals: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { modals: this.props.modals }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modals: nextProps.modals });
  }

  render() {
    return (
        <div>
          { _.map(this.state.modals, (modal) => (modal.open && <Dialog {...modal} key={modal.id} />)) }
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  modals: state.entities.modals,
})

const mapDispatchToProps = {
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals))