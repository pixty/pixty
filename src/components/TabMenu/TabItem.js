import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class TabItem extends React.PureComponent {

  componentDidMount() {
    if (this.props.active === this.props.id) {
      this.props.parent.setState({ active: { left: this.item.offsetLeft, width: this.item.getClientRects()[0].width}});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === nextProps.id) {
      nextProps.parent.setState({ active: { left: this.item.offsetLeft, width: this.item.getClientRects()[0].width}});
    }
  }

  onClick = () => {
    this.props.goTo.call(this, this.props.path);
  }

  render() {
    return(<li key={this.props.id} onClick={this.onClick} ref={(node) => {this.item = node;}} style={{fontWeight: 'normal',
      color: this.props.active === this.props.id ? 'white' : '#777', transition: 'color 0.3s ease', whiteSpace: 'nowrap', fontSize: '15px', marginRight: '15px', cursor: 'pointer'}}>
      {this.props.name}
    </li>);
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  { goTo: push }
)(TabItem);
