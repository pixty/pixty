// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Dialog from './Dialog';

type Props = {
  modals: {}
};

type State = {
  modals: {}
};

class Modals extends React.PureComponent<Props, State> {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { modals: this.props.modals };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modals: nextProps.modals });
  }

  render() {
    return (
        <div>
          { _.map(this.state.modals, (modal) => (modal.open && <Dialog {...modal} key={modal.id} />)) }
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  modals: state.entities.modals,
});

const mapDispatchToProps = {
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals));