import React from 'react';
import PropTypes from 'prop-types';
import PersonList from '../containers/PersonList';
import _ from 'lodash';
import CameraPreview from './styled/CameraPreview';
import PersonForm from './PersonForm';
import Modals from '../containers/Modals';
import TopMenu from './TopMenu';
import Draggable from 'react-draggable';
import Spinner from './Spinner';
import { Main, RightBar } from './styled/Main';

const RIGHT_BAR_WIDTH = 360;

class Scene extends React.Component {

  static propTypes = {
    scene: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    setUserSettings: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = { width: 0, opacity: 0, margin: 0, previewWidth: 142, previewHeight: 80 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPerson.id) {
      this.setState({ width: RIGHT_BAR_WIDTH, opacity: 1, margin: 0 });
    } else {
      this.setState({ width: 0, opacity: 0, margin: 0 });
    }

    if (nextProps.settings.zoomLevel !== this.props.settings.zoomLevel) {
      const w = this.props.settings.zoomLevel === 2 ? 142 : 142 * 2, h = this.props.settings.zoomLevel === 2 ? 80 : 80 * 2;
      this.setState(() => ({ previewWidth: w, previewHeight: h }));
    }
  }

  zoomCamera() {
    if (this.props.settings.zoomLevel === 1) {
      this.props.setUserSettings({zoomLevel: 2});
    } else {
      this.props.setUserSettings({zoomLevel: 1});
    }
  }

  pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  render() {
    const scene = this.props.scene;
    const selectedPerson = this.props.selectedPerson;

    let number = (Date.now() % 300) + 1;
    let snapshot_url = `http://pixty.io/assets/snapshots/rest${this.pad(number, 4)}.png`;

    return (
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '100%', overflow: 'hidden'}}>

        <Modals />

        <Draggable defaultPosition={{x:100, y:100}}>
          <CameraPreview onDoubleClick={this.zoomCamera.bind(this)} style={{display: this.props.settings.showPreview ? 'block' : 'none', transition: 'border 0.5s ease, width 0.5s ease, height 0.5s ease', position: 'absolute', width: this.state.previewWidth + 'px', height: this.state.previewHeight + 'px', borderRadius: '6px'}}>
            <img alt="Face" onDragStart={(event)=>{ event.preventDefault(); return false;}}   src={(scene.frame && scene.frame['picURL']) || snapshot_url}
            style={{transition: 'width 0.5s ease, height 0.5s ease', borderRadius: '5px', width: this.state.previewWidth + 'px', height: this.state.previewHeight + 'px'}}  />
          </CameraPreview>
        </Draggable>

        <Main right={this.state.width + 'px'} margin={this.state.margin + 'px'}>
          <TopMenu />

          { (scene.persons && scene.persons.length) ? <PersonList /> : <div style={{position: 'absolute', top: '50%', left: '50%'}}>
            <Spinner opacity={0.5} />
          </div>
          }

        </Main>

        <RightBar width={this.state.width + 'px'}  opacity={this.state.opacity} >
            <div style={{padding: '10px'}}>
            { selectedPerson && <PersonForm person={selectedPerson} /> }
            </div>
        </RightBar>
      </div>
    );
  }
}

export default Scene;
