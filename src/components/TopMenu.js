import React from 'react'
import PropTypes from 'prop-types'
import SelectedPerson from '../containers/SelectedPerson'
import ImageButton from './styled/ImageButton'
import Select from 'react-select'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../__less__/select.css'
import _ from 'lodash'

class TopMenu extends React.Component {

  static propTypes = {
    cameras: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { options: [], selected: null }
  }

  componentWillReceiveProps(nextProps) {
    const cams = _.map(nextProps.cameras, c => ({ value: c.id, label: c.id}))

    if (!_.isEqual(this.props.options, cams)) {
      this.setState({ options: cams, selected: cams[0] ? cams[0].value : null })
    }

  }

  render() {
    const options = this.state.options

    return (
      <div style={{margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 0}}>
          <div style={{float: 'left'}}>
            <ImageButton width="25px" type="image" src="/images/user.svg" />
          </div>
          <div style={{float: 'left', color: '#ccc', marginTop: '15px', marginLeft: '10px', fontSize: 'small'}}>{this.props.organizationName}</div>
        </div>
        <div style={{marginLefy: '15px', marginTop: '10px', width: '150px', flexGrow: 0}}>
          <Select
              name="form-field-name"
              value={this.state.selected}
              options={options}
              clearable={false}
              searchable={false}
            />
        </div>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 1}}>
          <div style={{float: 'left'}}>
            <ImageButton width="25px" type="image" src="/images/camera.svg" />
          </div>
          <div style={{float: 'left', color: '#ccc', marginTop: '15px', marginLeft: '10px', fontSize: 'small'}}>{this.props.camId}</div>
          <div style={{float: 'left', marginLeft: '15px'}}>
            <ImageButton width="25px" type="image" src="/images/eye.svg" />
          </div>
        </div>
        <div style={{width: '50px'}}>
          <ImageButton width="25px" type="image" src="/images/settings.svg" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cameras: state.entities.cameras
})

const mapDispatchToProps = {
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu))
