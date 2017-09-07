import React from 'react'
import PropTypes from 'prop-types'
import SelectedPerson from '../containers/SelectedPerson'
import DropDownMenu from './DropDownMenu'
import ImageButton from './styled/ImageButton'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../__less__/select.css'
import { openModal } from '../actions'
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

  openSettings = () => {
    this.props.openModalDialog('settings', <div>Settings<br/>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at laoreet est. Mauris ligula orci, auctor fringilla mollis ut, accumsan ac magna. Sed blandit dictum ex, a auctor est faucibus at. Aliquam mollis auctor nunc vitae lacinia. Ut et odio dui. Vivamus posuere lorem vitae magna mollis varius. Phasellus cursus dui non enim tincidunt pharetra. Vivamus ullamcorper eu dolor ac ornare. Maecenas mi turpis, consequat eget convallis quis, hendrerit id dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas non arcu sit amet libero euismod tincidunt ut eu velit. Proin tempor pulvinar pharetra.</div>);
    this.refs.drop_down.setState(() => ({open: false}));
  }

  render() {
    const options = this.state.options

    return (
      <div style={{margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 0}}>
          <div style={{float: 'left'}}>
            <img src="http://www.gravatar.com/avatar/6604f6e418d8db645955aa2626f7b309?s=60&d=identicon" style={{width: "30px", borderRadius: "30px", marginTop: "10px"}} />
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

          <div style={{float: 'left', marginLeft: '15px'}}>
            <DropDownMenu font_size="13px" icon_url='/images/camera.svg'>
              <ul>
                <li>✔ {this.props.camId}</li>
                <hr/>
                <li>Front Camera</li>
                <li>Rear Camera</li>
              </ul>
            </DropDownMenu>
          </div>

          <div style={{float: 'left', marginLeft: '15px'}}>
            <ImageButton width="25px" type="image" src="/images/eye.svg" />
          </div>
        </div>

        <div style={{width: '25px', marginRight: '15px'}}>
          <DropDownMenu ref='drop_down' float='right' icon_url='/images/settings.svg'>
            <ul>
              <li><Link to="/analytics">Analytics</Link></li>
              <hr/>
              <li onClick={this.openSettings}>Settings</li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </DropDownMenu>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cameras: state.entities.cameras
})

const mapDispatchToProps = {
  openModalDialog: openModal
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu))
