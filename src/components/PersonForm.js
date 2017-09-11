import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as api from '../api'
import { postProfile } from '../actions'
import _ from 'lodash'
import FormInput from './FormInput'
import styled from 'styled-components'
import ImageButton from './styled/ImageButton'
import { fetchProfile } from '../api'

const Button = styled.button`
  background: ${props => props.primary ? 'white' : 'none'};
  color: ${props => props.primary ? 'black' : 'white'};
  cursor: pointer;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 1px solid white;
  border-radius: 3px;
  transition: all 0.3s ease-out 0.06s;
  outline: none;
  &:hover {
    background: rgba(0,0,0,0.1)
  }
  &:active {
    opacity: 0.6;
  }
`;

class PersonForm extends React.PureComponent {
  static propTypes = {
    person: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { attributes: {}, profileId: null}
    this.findNextValue = this.findNextValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const person = nextProps.person
    const profile = person.profile
    Object.defineProperty( this, "PERSON", { value: person, writable: false, enumerable: true, configurable: true })
    Object.defineProperty( this, "PROFILE", { value: profile, writable: false, enumerable: true, configurable: true })

    if (profile) {
      if (this.state.profileId !== profile.id) {
        //this.setState({ attributes: profile.attributes, profileId: profile.id})
        //this.setState({profileId: profile.id})

        fetchProfile(profile.id).then((response) => {

            let attrs = {};
            response.response.attributes.map((a) => {
              attrs[a.name] = a.value;
            });

            setTimeout(() => this.setState({ attributes: attrs, profileId: profile.id}), 200);
          }
        );
      }
    } else {
      this.setState({ attributes: {}, profileId: null})
    }
  }

  onChange(key) {
    return el => {
      this.setState( { attributes: { ...this.state.attributes, ...{ [key] : el.target.value }}})
    }
  }

  findNextValue() {

    const keys = this.props.metaInfo.map((meta_key) => {
      if (!this.state.attributes) {
        return meta_key.fieldName;
      }

      if(this.state.attributes[meta_key.fieldName] || this.state.attributes[meta_key.fieldName] == '') {
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
      this.setState( { attributes: { ...this.state.attributes, ...{ [key] : '' }}})
    }
  }

  onClickUpdate() {
    this.props.update({orgId:1, id: this.PROFILE.id, ...this.state.attributes});
  }

  render() {
    const person = this.PERSON
    const profile = this.PROFILE

    if (!person)
      return null

    if (!profile)
      return (
        <div>
          <img src={this.props.person.avatarUrl} style={{width: "280px"}} />
          id: {person.id}<br/>
          No profile
          <Button onClick={() => alert('Create')}>Create</Button>
        </div>
      )

    return (
        <div>
          <img src={this.props.person.avatarUrl} style={{width: "280px"}} />
          <div style={{lineHeight: '150%', margin: '10px 0px', color: '#555', fontSize: '11px'}}>
          {person.id}
          </div>

          { _.keys(this.state.attributes).map( key => (
            <FormInput key={key} label={key} onChange={this.onChange(key)} value={this.state.attributes[key]} />
          ))
          }
          <div>
            <div style={{float: 'left', marginTop: '10px'}}>
              <ImageButton onClick={this.newAttribute.bind(this)} width="25px" type="image" src="/images/plus.svg" />
            </div>
            <div style={{float: 'right'}}>
              <Button onClick={this.onClickUpdate.bind(this)}>Save</Button>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  scene: state.entities.scene,
  metaInfo: state.entities.orgs[0].metaInfo,
})

const mapDispatchToProps = {
  update: postProfile
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonForm))