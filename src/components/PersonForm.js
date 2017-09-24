// @flow
import React from 'react';
//import * as React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
//import FormInput from './FormInput';
import FormAreaInput from './FormAreaInput';
import Spinner from './Spinner';
import ImageButton from './styled/ImageButton';
import { Button, CancelButton } from './styled/Button';
import DropDownMenu from './DropDownMenu';
import { fetchProfile, postProfile } from '../api';
import { clickPerson } from '../actions';

type Props = {
  +person: {
    avatarUrl: string,
    +profile: { id: string }
  },
  scene: {},
  metaInfo: Array<any>,
  orgId: string
};

type State = {
  attributes: {},
  all_attrs: Array<any>,
  profileId?: string,
  loggin: boolean,
}

class PersonForm extends React.PureComponent<Props, State> {

  person: {} | { id: string };
  profile: { id: string };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { attributes: {}, profileId: undefined, loggin: false, all_attrs: [] };
    //this.findNextValue = this.findNextValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.person = nextProps.person;
    this.profile = this.person && this.person.profile;

    if (this.profile) {
      if (this.state.profileId !== this.profile.id) {

        fetchProfile(this.profile.id).then((response) => {

            let attrs = {};
            response.response.attributes.map((a) => {
              attrs[a.name] = a.value;
              return null;
            });

            const all_attr = this.props.metaInfo.map((field) => ({fieldId: field.id, name: field.fieldName, value: attrs[field.fieldName]}));

            setTimeout(() => this.setState({ attributes: attrs, all_attrs: all_attr, profileId: this.profile.id}), 200);
          }
        );
      }
    } else {
      this.setState({ attributes: {}, profileId: undefined});
    }
  }

  onChange(key) {
    return el => {
      let new_attrs = this.state.all_attrs.map( (a) => (a.name === key ? {...a, value: el.target.value } : a));
      this.setState( { all_attrs: new_attrs, attributes: { ...this.state.attributes, ...{ [key] : el.target.value }}});
    };
  }

  findNextValue = () => {

    const keys = this.props.metaInfo.map((meta_key) => {
      if (!this.state.attributes) {
        return meta_key.fieldName;
      }

      if(this.state.attributes[meta_key.fieldName] || this.state.attributes[meta_key.fieldName] === '') {
        return null;
      } else {
        return meta_key.fieldName;
      }
    });

    return _.compact(keys)[0];
  }

  newAttribute = (fieldName) => {
    let key = fieldName || this.findNextValue();
    if (key) {
      this.setState( { attributes: { ...this.state.attributes, ...{ [key] : '' }}});
    }
  }

  onClickUpdate() {
    this.setState({loggin: true});
    postProfile({orgId: this.props.orgId, id: this.profile.id, Attributes: this.state.all_attrs, mappedFields: {"custom1" : "test"}})
    .then(resolve => {
      this.setState({loggin: false});
      //this.closeForm();
    }, reject => {
      this.setState({loggin: false});
    });
  }

  closeForm = () => {
    this.props.clickPerson({ id: this.props.person.id });
  }

  render() {
    const person = this.person;
    const profile = this.profile;
    const PIC_SIZE = 140;

    if (!person)
      return null;

    if (!profile)
      return (
        <div>
        </div>
      );

    return (
        <div>
          <div style={{overflowX: 'auto', overflowY: 'hidden'}}>
            <div style={{display: 'flex', width: this.props.person.pictures.length*PIC_SIZE + 'px'}}>
            { this.props.person.pictures.map((pic) => <img alt='Avatar' key={pic.id} src={pic.url} style={{width: PIC_SIZE+"px", height: PIC_SIZE+"px"}} />) }
            </div>
          </div>
          { _.keys(this.state.attributes).map( key => (
            <FormAreaInput key={key} label={key} onChange={this.onChange(key)} value={this.state.attributes[key]} />
          ))
          }
          <div>
            <div style={{float: 'left', marginTop: '10px', fontWeight: 'normal'}}>
              <DropDownMenu float="right" closeOnClick font_size="13px" icon_url='/images/plus.svg'>
                <ul>
                  { this.props.metaInfo.map( field => !this.state.attributes[field.fieldName] &&
                    <li onClick={this.newAttribute.bind(this, field.fieldName)} key={field.id}>{field.fieldName}</li>)}
                  <hr/>
                  <li key='custom'>Custom</li>
                </ul>
              </DropDownMenu>
            </div>

            <div style={{float: 'right', marginTop: '10px'}}>
              <Button size="14px" onClick={this.onClickUpdate.bind(this)}>
              { this.state.loggin ?
                <div style={{transform: 'scale(0.3)', position: 'absolute', marginLeft: '-4px'}}><Spinner stroke={4} noLabel /></div> : null }
                <div className="button__text" style={{marginLeft: this.state.loggin ? '19px' : '0px'}}>Save</div>
              </Button>
            </div>
            <div style={{float: 'right', marginTop: '10px', marginRight: '15px'}}>
              <CancelButton size="14px" onClick={this.closeForm}>
                Close
              </CancelButton>
            </div>
          </div>
          <div style={{clear:'both'}}>&nbsp;</div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  scene: state.entities.scene,
  metaInfo: state.entities.orgs[0].metaInfo,
  orgId: state.entities.orgs[0].id
});

const mapDispatchToProps = {
  clickPerson: clickPerson
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonForm));