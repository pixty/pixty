import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as api from '../api';
import { postProfile } from '../actions';
import _ from 'lodash';
import FormInput from './FormInput';
import styled from 'styled-components';
import ImageButton from './styled/ImageButton';
import { RegularButton } from './styled/Button';
import { fetchProfile } from '../api';

class PersonForm extends React.PureComponent {
  static propTypes = {
    person: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { attributes: {}, profileId: null};
    this.findNextValue = this.findNextValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const person = nextProps.person;
    const profile = person.profile;
    Object.defineProperty( this, "PERSON", { value: person, writable: false, enumerable: true, configurable: true });
    Object.defineProperty( this, "PROFILE", { value: profile, writable: false, enumerable: true, configurable: true });

    if (profile) {
      if (this.state.profileId !== profile.id) {
        //this.setState({ attributes: profile.attributes, profileId: profile.id})
        //this.setState({profileId: profile.id})

        fetchProfile(profile.id).then((response) => {

            let attrs = {};
            response.response.attributes.map((a) => {
              attrs[a.name] = a.value;
            });

            const all_attr = this.props.metaInfo.map((field) => ({fieldId: field.id, name: field.fieldName, value: attrs[field.fieldName]}));
            console.log(all_attr);

            setTimeout(() => this.setState({ attributes: attrs, all_attrs: all_attr, profileId: profile.id}), 200);
          }
        );
      }
    } else {
      this.setState({ attributes: {}, profileId: null});
    }
  }

  onChange(key) {
    console.log(this.state);
    return el => {
      let new_attrs = this.state.all_attrs.map( (a) => (a.name === key ? {...a, value: el.target.value } : a));
      this.setState( { all_attrs: new_attrs, attributes: { ...this.state.attributes, ...{ [key] : el.target.value }}});
    };
  }

  findNextValue() {

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
    console.log(keys);
    return _.compact(keys)[0];
  }

  newAttribute() {
    let key = this.findNextValue();
    if (key) {
      this.setState( { attributes: { ...this.state.attributes, ...{ [key] : '' }}});
    }
  }

  onClickUpdate() {
    this.props.update({orgId: this.props.orgId, id: this.PROFILE.id, Attributes: this.state.all_attrs});
  }

  render() {
    const person = this.PERSON;
    const profile = this.PROFILE;

    if (!person)
      return null;

    if (!profile)
      return (
        <div>
          <img src={this.props.person.avatarUrl} style={{width: "280px"}} />
          id: {person.id}<br/>
          <RegularButton onClick={() => alert('Create')}>Create</RegularButton>
        </div>
      );

    return (
        <div>
          <img src={this.props.person.avatarUrl} style={{width: "280px"}} />

          { _.keys(this.state.attributes).map( key => (
            <FormInput key={key} label={key} onChange={this.onChange(key)} value={this.state.attributes[key]} />
          ))
          }
          <div>
            <div style={{float: 'left', marginTop: '10px'}}>
              <ImageButton onClick={this.newAttribute.bind(this)} width="25px" type="image" src="/images/plus.svg" />
            </div>
            <div style={{float: 'right'}}>
              <RegularButton onClick={this.onClickUpdate.bind(this)}>Save</RegularButton>
            </div>
          </div>
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
  update: postProfile
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonForm));