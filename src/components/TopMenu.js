import React from 'react'
import PropTypes from 'prop-types'
import SelectedPerson from '../containers/SelectedPerson'
import ImageButton from './styled/ImageButton'
import Select from 'react-select'
import '../../__less__/select.css'

class TopMenu extends React.Component {

  render() {
    const options = [
      { value: 'c1', label: 'Main Hall' },
      { value: 'c2', label: 'Entrance' },
      { value: 'c3', label: 'Hidden in Hall' }
    ]

    return (      
      <div style={{margin: '0px 15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 0}}>
          <div style={{float: 'left'}}>
            <ImageButton width="25px" type="image" src="/images/user.svg" />
          </div>   
          <div style={{float: 'left', color: '#ccc', marginTop: '15px', marginLeft: '10px', fontSize: 'small'}}>{this.props.organizationName}</div>          
        </div>
        <div style={{marginLefy: '15px', marginTop: '10px', width: '150px', flexGrow: 0}}>
          <Select
              name="form-field-name"
              value="c1"
              options={options}
              clearable={false}
              searchable={false}
            />
        </div>
        <div style={{margin: '0px 15px', width: 'auto', flexGrow: 1}}>
          <div style={{float: 'left'}}>
            <ImageButton width="25px" type="image" src="/images/camera.svg" />
          </div>          
          <div style={{float: 'left', color: '#ccc', marginTop: '15px', marginLeft: '10px', fontSize: 'small'}}>{this.props.camId}</div>
          <div style={{float: 'left', marginLeft: '15px'}}>
            <ImageButton width="25px" type="image" src="/images/eye.svg" />
          </div>          
        </div>
        <div style={{width: '50px'}}>
          <ImageButton width="25px" type="image" src="/images/plus.svg" />
        </div>
        <div style={{width: '50px'}}>
          <ImageButton width="25px" type="image" src="/images/settings.svg" />
        </div>
      </div>
    )
  }
}

export default TopMenu
