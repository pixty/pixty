import React from 'react';
import { mainColor } from '../styled/Colors';

class TabMenu extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { active: { left: 0, widht: 0 }};
  }

  render() {

    console.log(this.props.push);

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       active: this.props.active,
       parent: this
     })
    );

    return (
      <div style={{position: 'relative', paddingBottom: '10px'}}>
        <div style={{transition: '0.5s ease', position: 'absolute', left: this.state.active.left+'px', top: '9px',
        width: this.state.active.width+'px', borderBottom: `1px solid ${mainColor}`}}>
          &nbsp;
        </div>
        <ul style={{display: 'flex'}}>
          {childrenWithProps}
        </ul>
      </div>
    );
  }
}

export default TabMenu;
