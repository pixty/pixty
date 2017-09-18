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
import { openModal, closeModal } from '../actions';
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
    this.props.openModalDialog('about', <div>
      Pixty Face Recognition.<br/><br/>
      <span style={{fontSize: '13px'}}>
      build v.0.1.9.<br/>
      © 2017 Pixty Inc. All rights reserved.
      </span>
      <br/>
      <div onClick={this.props.closeModalDialog.bind(this, 'about')} style={{float: 'right', marginBottom: '15px'}}>
        <RegularButton>OK</RegularButton>
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

          <DropDownMenu ref='eye_down' font_size="13px" float='right' icon_url='/images/eye.svg'>
            <ul>
              <li>Hide preview</li>
              <hr/>
              <li>✔ Small size</li>
              <li>Medium size</li>
            </ul>
          </DropDownMenu>
        </div>

        <div style={{width: '25px', marginRight: '15px'}}>
          <DropDownMenu ref='drop_down' float='right' icon_url='/images/settings.svg'>
            <ul>
              <li onClick={this.openSettings}>About...</li>
              <hr/>
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
  openModalDialog: openModal,
  closeModalDialog: closeModal
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu));
