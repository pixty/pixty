import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as api from '../api'
import { postProfile } from '../actions'
import _ from 'lodash'
import FormInput from './FormInput'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import ImageButton from './styled/ImageButton'

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

class PersonForm extends React.Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { attributes: {}, profileId: null}
  }

  componentWillReceiveProps(nextProps) {
    const person = nextProps.person
    const profile = person.profile && nextProps.profiles[person.profile]
    Object.defineProperty( this, "PERSON", { value: person, writable: false, enumerable: true, configurable: true })
    Object.defineProperty( this, "PROFILE", { value: profile, writable: false, enumerable: true, configurable: true })

    if (profile) {
      if (this.state.profileId !== profile.id)
        this.setState({ attributes: profile.attributes, profileId: profile.id})
    } else {
      this.setState({ attributes: {}, profileId: null})
    }
  }

  onChange(key) {
    return el => {
      this.setState( { attributes: { ...this.state.attributes, ...{ [key] : el.target.value }}})
    }
  }

  newAttribute() {
    let key = '_' + parseInt(Math.random() * 1000)
    this.setState( { attributes: { ...this.state.attributes, ...{ [key] : '' }}})
  }

  onClickUpdate() {
    this.props.update({id: this.PROFILE.id, ...this.state.attributes});
  }

  render() {
    const person = this.PERSON
    const profile = this.PROFILE

    if (!person)
      return null

    if (!profile)
      return (
        <div>
          id: {person.id}<br/>
          No profile
          <Button onClick={() => alert('Create')}>Create</Button>
        </div>
      )

    return (
        <div>
          <ReactTooltip />
          <img src={this.props.pictures[this.props.person.pictures[0]].url} style={{width: "300px"}} />
          <div style={{lineHeight: '150%', marginTop: '20px', color: '#ccc'}}>
          id: {person.id}<br/>
          p_id: {profile.id}<br/>
          occuracy: {profile.occuracy}<br/>
          </div>

          { _.keys(this.state.attributes).map( key => (
            <FormInput key={key} label={key} onChange={this.onChange(key)} value={this.state.attributes[key]} />
          ))
          }
          <div>
            <div style={{float: 'left'}}>
              <ImageButton data-tip="Add New Field" onClick={this.newAttribute.bind(this)} width="25px" type="image" src="/images/plus.svg" />
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
  scenes: state.entities.scenes,
  persons: state.entities.persons,
  pictures: state.entities.pictures,
  profiles: state.entities.profiles,
})

const mapDispatchToProps = {
  update: postProfile
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonForm))