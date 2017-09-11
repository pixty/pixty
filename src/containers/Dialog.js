import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { closeModal } from '../actions'
import Draggable from 'react-draggable'
import ImageButton from '../components/styled/ImageButton'

const dialogStyle = {
      minWidth: '30px',
      position: 'absolute',
      zIndex: 100,
      background: '#333',
      borderRadius: '6px',
      borderTop: '1px solid #444',
      borderLeft: '1px solid #444',
      borderBottom: '2px solid #222',
      borderRight: '2px solid #222',
      color: 'white',
      padding: '0px',
      margin: '0px',
      boxShadow: '8px 8px 12px rgba(0,0,0,0.2)',
      transition: 'opacity 0.2s ease'
}

class Dialog extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, width: 0, height: 0, opacity: 0 }
    this.dragStop = this.dragStop.bind(this);

    //opacity: this.state.opacity

  }

  componentDidMount() {
    this.setState({ x: (window.innerWidth - this.dialog.offsetWidth)/2, y: (window.innerHeight - this.dialog.offsetHeight)/2 },
      () => { setTimeout(() => (this.setState({ opacity: 1})), 0); });
  }

  dragStop(event, node) {
    this.setState({ x: node.x, y: node.y });
  }

  setDialog(node) {
    this.dialog = node;
  }

  render() {
    const { id, context, closeDialog } = this.props;

    console.log(this.props);

    return (
      <Draggable handle='.drag_header' position={{x: this.state.x, y: this.state.y}} onStop={this.dragStop}>
        <div ref={this.setDialog.bind(this)} style={ {...dialogStyle, opacity: this.state.opacity, maxWidth: '800px' }}>
          <div className='drag_header'style={{borderBottom: '1px solid #444', overflow: 'hidden', padding: '3px 6px'}}>
            <div style={{float: 'left', fontSize: '13px', color: '#777', fontWeight:'bold', textTransform: 'uppercase'}}>{id}</div>
            <div style={{float: 'right', marginTop: '3px'}}>
              <ImageButton width="10px" type="image" onClick={() => (closeDialog.call(this, id))} src="/images/cross.svg" />
            </div>
          </div>
          <div style={{clear: 'both', margin: '0px', padding: '20px'}}>
            {context}
          </div>
        </div>
      </Draggable>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = {
  closeDialog: closeModal
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog))