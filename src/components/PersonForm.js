// @flow
import React from 'react';
//import * as React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import FormInput from './FormInput';
import FormAreaInput from './FormAreaInput';
import Spinner from './Spinner';
import ImageButton from './styled/ImageButton';
import { Button, CancelButton, DeleteButton } from './styled/Button';
import DropDownMenu from './DropDownMenu';
import { fetchProfile, postProfile, putPerson, deletePerson,
         deletePersonFaces, getProfilePersons, mergeTwoProfiles } from '../api';
import { clickPerson, openModal, closeModal  } from '../actions';
import { mainColor } from '../components/styled/Colors';

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
    this.state = { attributes: {}, profileId: undefined, loggin: false, edit_photos: false,
    avatarUrl: null, selectedPictureId: null, all_pictures: null,
    all_attrs: [], new_key: null, new_value: null };
    //this.findNextValue = this.findNextValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.person = nextProps.person;
    this.profile = this.person && this.person.profile;

    if (this.profile) {
      if (this.state.profileId !== this.profile.id) {

        getProfilePersons(this.profile.id).then(({response}) => {
            let pictures = [];
            _.map(response, person => person.pictures).map(index => index.map(el => pictures.push(el)));
            this.setState({ all_pictures: pictures});
        });

        fetchProfile(this.profile.id).then((response) => {

            let attrs = {};
            response.response.attributes && response.response.attributes.map((a) => {
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

  onChangeInput() {
    this.setState({ [arguments[0]] : arguments[1].target.value });
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
    postProfile({orgId: this.props.orgId, avatarUrl: this.state.avatarUrl, id: this.profile.id, Attributes: this.state.all_attrs, mappedFields: {"custom1" : "test"}})
    .then(resolve => {
      setTimeout(() => this.setState({loggin: false}), 400);
      //this.closeForm();
    }, reject => {
      this.setState({loggin: false});
    });
  }

  closeForm = () => {
    this.props.clickPerson({ id: this.props.person.id });
  }

  addCustom = () => {
    this.props.openModalDialog('add attribute', <div style={{padding: '0px', paddingBottom: '0px', minWidth: '300px'}}>

        <FormInput noAnimation onChange={this.onChangeInput.bind(this, 'new_key')} label="Key"></FormInput>
        <FormInput noAnimation onChange={this.onChangeInput.bind(this, 'new_value')} label="Value"></FormInput>

        <div onClick={this.props.closeModalDialog.bind(this, 'add attribute')}
        style={{display: 'flex', width: '100%', marginTop: '30px', justifyContent: 'center'}}>
          <CancelButton size="14px">Cancel</CancelButton>
          <div style={{marginLeft: '15px'}}>
            <Button size="14px">Add</Button>
          </div>
        </div>
      </div>);
  }

  mergeProfiles = (profile_1_id, profile_2_id) => {
    mergeTwoProfiles(profile_1_id, profile_2_id).then(resolve => {
      alert('merged!');
    }, reject => {
      alert('error');
    });
  }

  attachProfile = (person_id, profile_id, avatar_url) => {
    putPerson({orgId: this.props.orgId, id: person_id, ProfileId: profile_id, CamId: 1, /*AvatarUrl: avatar_url*/})
    .then(resolve => {
      alert('resolve', resolve);
    }, reject => {
      alert('reject', reject);
    });
  }

  deletePicture = (person_id, pic_id) => {
    deletePersonFaces(person_id, [pic_id]).then(resolve => {
      let pictures = [...this.state.all_pictures];
      let index = _.findIndex(pictures, {id: pic_id});
      pictures[index].deleted = true;
      this.setState({ all_pictures: pictures });
    }, reject => {
      alert(reject.statusText);
    });

  }

  deletePerson = (person_id) => {
    if (confirm('Are You Sure?'))
      deletePerson(person_id).then(resolve => {
        alert('deleted');
      }, reject => {
        alert('error');
      });
  }

  selectAvatar = (pic_id, pic_url) => {
    this.setState({ selectedPictureId: pic_id, avatarUrl: pic_url.substring(28) });
  }

  toggleEditPhotos = () => {
    this.setState({ edit_photos: !this.state.edit_photos});
  }

  render() {
    const person = this.person;
    const profile = this.profile;
    const PIC_SIZE = 140;


    if (!person) {
      return (
        <div>
        no person
        </div>
      );
    }

    if (!profile) {
      let matches = this.person.matches;

      return (
        <div style={{color: '#ccc', fontWeight: 'normal', fontSize: '14px'}}>
        <DeleteButton onClick={this.deletePerson.bind(this, person.id)}>Delete</DeleteButton><br/>
        person.id = {person.id}<br/>
        matchingResult: {person.matchingResult}
         {matches && matches.map(match => <div key={match.id}>matches<br/>
            <img src={match.avatarUrl} style={{width: '100px'}} /><br/>
            <CancelButton size="14px" onClick={this.attachProfile.bind(this, person.id, match.id, match.avatarUrl)}>Attach</CancelButton>
          </div>)}
         <br/>
         {matches && matches.length == 2 && <DeleteButton onClick={this.mergeProfiles.bind(this, matches[0].id, matches[1].id)}>Merge {matches[0].id} with {matches[1].id}</DeleteButton>}
        </div>
      );
    }

    return (
        <div style={{padding: '5px'}}>
          <div style={{fontSize: 'small', color: '#777', fontWeight: 'normal', marginBottom: '12px'}}>
            {person.matchingResult} profile.id: {profile.id}
            <div style={{float: 'right'}}>
              <CancelButton onClick={this.toggleEditPhotos} size="11px">{this.state.edit_photos ? 'Done' : 'Edit Photos'}</CancelButton>
            </div>
          </div>
          <div style={{overflowX: 'auto', overflowY: 'hidden'}}>
            <div style={{display: 'flex', width: this.state.all_pictures && this.state.all_pictures.length*PIC_SIZE + 'px'}}>
            { this.state.all_pictures && this.state.all_pictures.map((pic) => <div key={pic.id} style={{position:'relative'}}>
              {this.state.edit_photos && !pic.deleted && <div style={{position: 'absolute', zIndex: 3}}>
                <ImageButton type='image' onClick={this.deletePicture.bind(this, person.id, pic.id)} src='/images/minus.svg' width='20px' />
              </div> }
              <img title={pic.id} alt='Avatar' onClick={this.selectAvatar.bind(this, pic.id, pic.url)} key={pic.id} src={pic.url}
              style={{transition: 'all 0.4s ease', opacity: pic.deleted ? 0.1 : 1.0, cursor: 'pointer', border: this.state.selectedPictureId === pic.id ? `2px solid ${mainColor}` : '2px solid transparent', width: PIC_SIZE+"px", height: PIC_SIZE+"px"}} />
              </div>) }
            </div>
          </div>
          { _.keys(this.state.attributes).map( key => (
            <FormAreaInput key={key} label={key} onChange={this.onChange(key)} value={this.state.attributes[key]} />
          ))
          }
          <div>
            <div style={{float: 'left', marginTop: '10px', fontWeight: 'normal'}}>
              <DropDownMenu top float="right" closeOnClick font_size="13px" icon_url='/images/plus.svg'>
                <ul>
                  { this.props.metaInfo && this.props.metaInfo.map( field => !this.state.attributes[field.fieldName] &&
                    <li onClick={this.newAttribute.bind(this, field.fieldName)} key={field.id}>{field.fieldName}</li>)}
                  <li onClick={this.addCustom} key='custom'>Custom Attributes</li>
                </ul>
              </DropDownMenu>
            </div>

            <div style={{float: 'right', marginTop: '10px'}}>
              <Button size="14px" onClick={this.onClickUpdate.bind(this)}>
              { this.state.loggin ?
                <div style={{transform: 'scale(0.3)', position: 'absolute', marginTop: '-1px', marginLeft: '-4px'}}><Spinner stroke={4} noLabel /></div> : null }
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
          <DeleteButton onClick={this.deletePerson.bind(this, person.id)}>Delete</DeleteButton>
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
  clickPerson: clickPerson,
  openModalDialog: openModal,
  closeModalDialog: closeModal
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonForm));