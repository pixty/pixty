import React from 'react';
import PropTypes from 'prop-types';
import SelectedPerson from '../containers/SelectedPerson';
import DropDownMenu from './DropDownMenu';
import ImageButton from './styled/ImageButton';
import { RegularButton } from './styled/Button';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../__less__/select.css';
import { openModal } from '../actions';
import { CurrentUser } from '../api';
import _ from 'lodash';

class TopMenu extends React.Component {

  static propTypes = {
    org: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    const cams = _.map(this.props.org.cameras, c => ({ id: c.id, label: c.name}));

    this.state = { options: cams, selected: CurrentUser.getCamera() };
  }

  componentWillReceiveProps(nextProps) {
    const cams = _.map(nextProps.org.cameras, c => ({ id: c.id, label: c.name}));

    if (!_.isEqual(this.props.options, cams)) {
      this.setState({ options: cams, selected: CurrentUser.getCamera() });
    }

  }

  openSettings = () => {
    this.props.openModalDialog('settings', <div>
      CurrentUser selected_camera_id: {CurrentUser.getCamera()}<br/>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at laoreet est. Mauris ligula orci, auctor fringilla mollis ut, accumsan ac magna. Sed blandit dictum ex, a auctor est faucibus at. Aliquam mollis auctor nunc vitae lacinia. Ut et odio dui. Vivamus posuere lorem vitae magna mollis varius. Phasellus cursus dui non enim tincidunt pharetra. Vivamus ullamcorper eu dolor ac ornare. Maecenas mi turpis, consequat eget convallis quis, hendrerit id dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas non arcu sit amet libero euismod tincidunt ut eu velit. Proin tempor pulvinar pharetra.
<br/><br/>
<div style={{float: 'right', marginBottom: '15px'}}>
  <RegularButton>Save</RegularButton>
</div>
</div>);
    this.refs.drop_down.setState(() => ({open: false}));
  }

  selectCamera(id) {
    CurrentUser.setCamera(id);
    this.setState({ selected: id });
    this.refs.camera_select.setState(() => ({open: false}));
  }

  render() {
    const options = this.state.options;

    return (
      <div style={{margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 0, display: 'flex'}}>
          <div>
            <img src="http://www.gravatar.com/avatar/6604f6e418d8db645955aa2626f7b309?s=60&d=identicon" style={{width: "30px", borderRadius: "30px", marginTop: "10px"}} />
          </div>
          <div style={{color: '#ccc', marginTop: '15px', marginLeft: '10px', fontSize: '14px', fontWeight: 'bold'}}>{this.props.org.name}</div>
        </div>

        <div style={{margin: '0px 15px', width: 'auto', flex: 1, display: 'flex'}}>
          <div>
            <DropDownMenu ref='camera_select' font_size="13px" icon_url='/images/camera.svg'>
              <ul>
                { options.map( opt => <li onClick={this.selectCamera.bind(this, opt.id)} key={opt.id}>{ this.state.selected === opt.id ? '✔ ' : ''}{opt.label}</li>)}
              </ul>
            </DropDownMenu>
          </div>
          <div style={{marginTop: '4px', marginLeft: '10px', color: '#888', flex: 7,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: '10px',
          fontSize: '13px', fontWeight: '200'}}>
            {this.state.selected && options[this.state.selected-1].label}
          </div>

          <div style={{flex: 1}}>
            &nbsp;
          </div>

          <div>
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
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  org: state.entities.orgs[0]
});

const mapDispatchToProps = {
  openModalDialog: openModal
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu));
