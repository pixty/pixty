import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { CurrentUser, postSession } from '../api';
import { Button, RegularButton } from './styled/Button';
import Link from './styled/Link';
import logo from '../../public/images/logo.svg';
import FormInput from './FormInput';
import Modals from '../containers/Modals';
import { openModal, closeModal } from '../actions';
import Spinner from './Spinner';
import { LoginFooter } from './LoginFooter';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.currentUser = new CurrentUser();
    this.state = { token: this.currentUser.getToken(), login: null, password: null, loggin: false };

    this.isElectron = window && window.process && window.process.type;

    if (this.isElectron) {
      const electron = window.require('electron');
      const {dialog} = window.require('electron').remote;
      this.dialog = dialog;
    }
  }

  signIn() {
    this.setState({ loggin: true });
    postSession(this.state.login, this.state.password).then(response => {
      const sessionId = response.response.sessionId;
      const user = response.response.user;

      this.setState(() => ({ loggin: false }));

      if (sessionId) {
        this.currentUser.signIn(sessionId);
        CurrentUser.setUser(user);
        this.props.store.dispatch(push('/'));
        //window.location.reload();
      } else {
        return Promise.reject();
      }

    }, error => {
      this.setState(() => ({ loggin: false }));

      if (this.isElectron) {
        this.dialog.showErrorBox('Error', 'Invalid username or password.');
      } else {
        this.props.openModalDialog('login', <div style={{padding: '10px', paddingBottom: '0px'}}>
          Invalid username or password.<br/>
          <div onClick={this.props.closeModalDialog.bind(this, 'login')} style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <RegularButton>OK</RegularButton>
          </div>
        </div>);
      }
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
      <div style={{width: '100%', minHeight: '450px', height: '100%', display: 'flex', background: this.isElectron ? 'none' : '#333', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <Link to="/"><img src={logo} alt='Pixty' style={{width: '130px'}}/></Link>
          <form action='' onSubmit={(event) => event.preventDefault()}>
          <div style={{paddingBottom: '40px'}}>
            <FormInput onChange={this.onChange.bind(this, 'login')} label="Login"></FormInput>
            <FormInput onChange={this.onChange.bind(this, 'password')} label="Password" password></FormInput>
          </div>
          <Button type='submit' onClick={this.signIn.bind(this)}>
            { this.state.loggin ?
            <div style={{transform: 'scale(0.3)', position: 'absolute', marginLeft: '-4px'}}><Spinner stroke={4} noLabel /></div> : null }
            <div className="button__text" style={{marginLeft: this.state.loggin ? '19px' : '0px'}}>Sign In</div>
          </Button>
          </form>

          <div style={{paddingTop: '20px'}}>
            <Link to='/signup'><span style={{color: '#aaa', marginRight: '8px'}}>Create new Account</span>
            <img src='/images/arrow-to-right.svg' style={{width: '10px', marginRight: '6px'}} />
            Sign Up</Link>
            <LoginFooter />
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
  openModalDialog: openModal,
  closeModalDialog: closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
