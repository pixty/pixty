import React from 'react'
import PropTypes from 'prop-types'
import PersonList from '../containers/PersonList'
//import SelectedPerson from '../containers/SelectedPerson'
import _ from 'lodash'
import styled from 'styled-components'
import SelectedPerson from './SelectedPerson'
import CameraPreview from './styled/CameraPreview'
import PersonForm from './PersonForm'
import Modals from '../containers/Modals'
import TopMenu from './TopMenu'
import Draggable from 'react-draggable'
import { backroundColor } from './styled/Colors'

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
  overflow: auto;
  width: ${props => props.width};
  border-left: 1px solid rgba(0,0,0,0.3);
`;

class Scene extends React.Component {
  static propTypes = {
    scenes: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = { width: 0, opacity: 0, margin: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPerson.id) {
      this.setState({ width: 300, opacity: 1, margin: 0 })
    } else {
      this.setState({ width: 0, opacity: 0, margin: 0 })
    }
  }

  render() {
    const scenes = _.values(this.props.scenes)
    const persons = _.values(this.props.persons)
    //const pictures = _.values(this.props.pictures)
    const snapshotScr = scenes && scenes[0] && scenes[0].snapshot && scenes[0].snapshot.url
    const foundFaces = scenes && persons && _.map(persons, id => { return { rect: id.snapshotRect, id: id.id } })

    const selectedPerson = this.props.selectedPerson

    return (
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '100%', overflow: 'hidden'}}>

        <Modals />

        <Draggable>
          <CameraPreview style={{position: 'absolute', width: '143px', height: '80px'}}>
            <img alt="Face" src={snapshotScr} style={{borderRadius: '5px'}} className="Scene--size" />
            { _.map(foundFaces, face =>
              <div className="Face" style={{borderColor: '#ADD8E6'}}key={face.id} />
            )}
          </CameraPreview>
        </Draggable>

        <Main right={this.state.width + 'px'} margin={this.state.margin + 'px'}>
          <TopMenu organizationName={scenes && scenes[0] && scenes[0].organizationName} camId={scenes && scenes[0] && scenes[0].camId} />
          <PersonList />
        </Main>

        <RightBar width={this.state.width + 'px'}  opacity={this.state.opacity} >
            <div style={{padding: '10px'}}>
            { selectedPerson && <PersonForm person={selectedPerson} /> }
            </div>
        </RightBar>
      </div>
    )
  }
}

/*
<div className="Scene">
          <div style={{position: 'absolute'}}>
            <img alt="Face" src={snapshotScr} />
            { _.map(foundFaces, face =>
              <div className="Face" key={ index++ }style={{ top: face.t, left: face.l, bottom: face.b, right: face.r}}/>
            )}
          </div>
        </div>
*/

export default Scene
