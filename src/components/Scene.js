import React from 'react';
import PropTypes from 'prop-types';
import PersonList from '../containers/PersonList';
import _ from 'lodash';
import styled from 'styled-components';
import CameraPreview from './styled/CameraPreview';
import PersonForm from './PersonForm';
import Modals from '../containers/Modals';
import TopMenu from './TopMenu';
import Draggable from 'react-draggable';
import { backroundColor } from './styled/Colors';
import Spinner from './Spinner';

const Main = styled.div.attrs({
  //marginRight: props => props.right || '0px',
})`
  position: absolute;
  right: ${props => props.right };
  left: 0px;
  top: 0px;
  bottom: 0px;
  margin-right: ${props => props.margin };
  transition: all 0.5s ease;
`;

const RightBar = styled.div.attrs({
  width: props => props.width || '0px',
  opacity: props => props.opacity || 0,
})`
  position: absolute;
  background: ${backroundColor};
  opacity: ${props => props.opacity};
  right: 0px;
  top: 0px;
  padding: 0px;
  font-weight: 300;
  height: 100%;
  z-index: 3;
  transition: all 0.5s ease;
  overflow-x: hidden;
  overflow-y: auto;
  width: ${props => props.width};
  border-left: 1px solid rgba(0,0,0,0.3);
`;

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
      this.setState({ width: 300, opacity: 1, margin: 0 });
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
