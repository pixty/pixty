import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CurrentUser, postSession } from '../api';
import { Button } from './styled/Button';
import Link from './styled/Link';
import logo from '../../public/images/logo.svg';
import FormInput from './FormInput';
import Modals from '../containers/Modals';
import { openModal } from '../actions';

const base64 = require('base-64');

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.currentUser = new CurrentUser();
    this.state = { token: this.currentUser.getToken(), login: null, password: null };
  }

  signIn() {
    postSession(this.state.login, this.state.password).then(response => {
      let sessionId = response.sessionId;

      this.currentUser.signIn(this.state.login);
      this.props.store.dispatch(push('/'));
      window.location.reload();

    }, error => {
      this.props.openModalDialog('login', <div style={{padding: '10px'}}>Invalid username or password.</div>);
    });
  }

  onChange() {
    this.setState({ [arguments[0]] : arguments[1].target.value });
  }

  componentDidMount() {
    //if (this.state.token) {
    //  this.props.store.dispatch(push('/'));
    //}
  }

  render() {
    return (
      <div>
      <Modals />
      <div style={{width: '100%', height: '100%', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <img src={logo} style={{width: '130px'}}/>
          <form action='' onSubmit={(event) => event.preventDefault()}>
          <div style={{paddingBottom: '40px'}}>
            <FormInput onChange={this.onChange.bind(this, 'login')} label="Login"></FormInput>
            <FormInput onChange={this.onChange.bind(this, 'password')} label="Password" password></FormInput>
          </div>
          <Button type='submit' onClick={this.signIn.bind(this)}>Sign In</Button>
          </form>

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
      </div>
    );
  }
}

LoginPage.propTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
  openModalDialog: openModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
