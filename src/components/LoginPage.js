import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { CurrentUser } from '../api'
import Button from './styled/Button'
import Link from './styled/Link'
import logo from '../../public/images/logo.svg'
import FormInput from './FormInput'


const base64 = require('base-64')

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.currentUser = new CurrentUser()
    this.state = { token: this.currentUser.getToken() }
  }

  signIn() {

    const user = 'stas',
          password = '123456';

    fetch('https://rentaplane.online/api/sessions', {
      method: 'POST',
      //credentials: "include",
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + base64.encode(user + ":" + password)
      },
      //body: JSON.stringify({user: user, password: password})
    }).then(
      response => {
        //if (!response.ok) {
        //  return Promise.reject(response)
        //}
        this.currentUser.signIn(+new Date + '-' + Math.random().toString().slice(-5))
        this.props.store.dispatch(push('/'));
        window.location.reload();
      }
    ).catch(error => { alert(error.message || 'Something bad happened') })
  }

  componentDidMount() {
    //if (this.state.token) {
    //  this.props.store.dispatch(push('/'));
    //}
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <img src={logo} style={{width: '130px'}}/>
          <div style={{paddingBottom: '40px'}}>
            <FormInput label="Login"></FormInput>
            <FormInput label="Password" password></FormInput>
          </div>
          <Button onClick={this.signIn.bind(this)}>Sign In</Button>

          <div style={{paddingTop: '20px'}}>
            <Link to='/forgot'><span style={{color: '#aaa', marginRight: '8px'}}>Forgot your Password?</span> Restore</Link>
            <Link to='/forgot'><span style={{color: '#aaa', marginRight: '8px'}}>Create new Account</span> Sign Up</Link>
            <hr style={{border: 'none', borderBottom: '1px dotted #222', marginTop: '20px'}}/>
            <Link to='/forgot'>Terms of Service</Link>
            <Link to='/forgot'>Privacy</Link>
            <div style={{color: '#555', marginTop: '20px', fontSize: '11px'}}>© 2017 Pixty Inc.</div>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  store: PropTypes.object.isRequired
}

export default LoginPage