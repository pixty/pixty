import React from 'react';
import PropTypes from 'prop-types';
import ImageButton from './styled/ImageButton';
import DropDown from './styled/DropDown';

class DropDownMenu extends React.Component {

  static PropTypes = {
    icon_url: PropTypes.string,
    open: PropTypes.boolean,
    closeOnClick: PropTypes.boolean
  }

  constructor(props) {
    super(props);
    this.state = { open: this.props.open || false, left_offset: 0 };
    this.setMenu = this.setMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onClick() {
    if (this.props.float && this.props.float === 'right') {
      this.setState({ open: !this.state.open, left_offset: 30 - this.menu.querySelector('._drop_down').offsetWidth });
    } else {
      this.setState({ open: !this.state.open, left_offset: -7 });
    }
  }

  onClickMenu = (event) => {
    if (this.props.closeOnClick) {
      this.setState({ open : false });
    }
  }

  handleClickOutside(event) {
    if (this.menu && !this.menu.contains(event.target)) {
        this.setState({ open : false });
    }
  }

  setMenu(node) {
    this.menu = node;
  }

  render() {
    return (
      <div ref={this.setMenu} style={{position:'relative'}}>
        <ImageButton width="25px" type="image" src={this.props.icon_url} onClick={this.onClick}/>
        <DropDown {...this.props} onClick={this.onClickMenu} className='_drop_down' left={this.state.left_offset} style={{visibility: this.state.open ? 'visible' : 'hidden', opacity: this.state.open ? 1 : 0}}>
          {this.props.children}
        </DropDown>
      </div>
    );
  }

}

export default DropDownMenu;