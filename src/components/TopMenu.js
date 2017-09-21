import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from './DropDownMenu';
import { RegularButton } from './styled/Button';
//import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../__less__/select.css';
import { openModal, closeModal, setSettings } from '../actions';
import { CurrentUser } from '../api';
import _ from 'lodash';
import md5 from 'md5';
import pack from '../../package.json';

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
    this.props.openModalDialog('about', <div>
      Pixty Face Recognition.<br/><br/>
      <span style={{fontSize: '13px'}}>
      build v.{pack.version}<br/>
      © 2017 Pixty Inc. All rights reserved.
      </span>
      <br/>
      <div onClick={this.props.closeModalDialog.bind(this, 'about')} style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
        <RegularButton>OK</RegularButton>
      </div>
      </div>);
  }

  togglePreview = () => {
    this.props.setUserSettings({showPreview: !this.props.settings.showPreview});
  }

  setZoom = (level) => {
    this.props.setUserSettings({zoomLevel: level});
  }

  logOut = () => {
    window.location = '/logout';
  }

  selectCamera(id) {
    CurrentUser.setCamera(id);
    this.setState({ selected: id });
  }

  render() {
    const options = this.state.options;
    const user = CurrentUser.getUser();
    let gravatar_id = user && user.email ? user.email : (user && user.login) || 'notset';

    return (
      <div style={{margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 0, display: 'flex'}}>
          <div>
            <img alt="User" src={`http://www.gravatar.com/avatar/${md5(gravatar_id)}?s=60&d=identicon&email=${gravatar_id}`} style={{width: "30px", borderRadius: "30px", marginTop: "10px"}} />
          </div>
          <div style={{color: '#ccc', marginTop: '15px', marginLeft: '10px', fontSize: '14px', fontWeight: 'bold'}}>{this.props.org.name}</div>
        </div>

        <div style={{margin: '0px 15px', width: 'auto', flex: 1, display: 'flex'}}>
          <div>
            <DropDownMenu closeOnClick font_size="13px" icon_url='/images/camera.svg'>
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

          <DropDownMenu closeOnClick ref='eye_down' font_size="13px" float='right' icon_url='/images/eye.svg'>
            <ul>
              <li onClick={this.togglePreview}>{this.props.settings.showPreview ? 'Hide preview' : 'Show preview'}</li>
              <hr/>
              <li onClick={this.setZoom.bind(this, 1)}>{ this.props.settings.zoomLevel === 1 && '✔' } Small size</li>
              <li onClick={this.setZoom.bind(this, 2)}>{ this.props.settings.zoomLevel === 2 && '✔' } Medium size</li>
            </ul>
          </DropDownMenu>
        </div>

        <div style={{width: '25px', marginRight: '15px'}}>
          <DropDownMenu closeOnClick float='right' icon_url='/images/settings.svg'>
            <ul>
              <li onClick={this.openSettings}>About...</li>
              <hr/>
              <li onClick={this.logOut}>Logout</li>
            </ul>
          </DropDownMenu>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  org: state.entities.orgs[0],
  settings: state.entities.settings,
});

const mapDispatchToProps = {
  openModalDialog: openModal,
  closeModalDialog: closeModal,
  setUserSettings: setSettings
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu));
