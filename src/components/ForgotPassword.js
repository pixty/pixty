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


class ForgotPassword extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.currentUser = new CurrentUser();
    this.state = { token: this.currentUser.getToken(), email: null, loggin: false };
  }

  signIn() {
    this.setState({ loggin: true });
    postSession(this.state.login, this.state.password).then(response => {
      const sessionId = response.response.sessionId;
      const user = response.response.user;

      this.setState(() => ({ loggin: false }));

    }, error => {
      this.setState(() => ({ loggin: false }));
      this.props.openModalDialog('login', <div style={{padding: '10px', paddingBottom: '0px'}}>
        Email don't belongs to any account.<br/>
        <div onClick={this.props.closeModalDialog.bind(this, 'login')} style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
          <RegularButton>OK</RegularButton>
        </div>
      </div>);
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
      <div style={{width: '100%', minHeight: '450px', height: '100%', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <img src={logo} alt='Pixty' style={{width: '130px'}}/>
          <form action='' onSubmit={(event) => event.preventDefault()}>
          <div style={{paddingBottom: '40px'}}>
            <FormInput onChange={this.onChange.bind(this, 'email')} label="Email"></FormInput>
          </div>
          <Button type='submit' onClick={this.signIn.bind(this)}>
            { this.state.loggin ?
            <div style={{transform: 'scale(0.3)', position: 'absolute', marginLeft: '-4px'}}><Spinner stroke={4} noLabel /></div> : null }
            <div className="button__text" style={{marginLeft: this.state.loggin ? '19px' : '0px'}}>Restore</div>
          </Button>
          </form>

          <div style={{paddingTop: '20px'}}>
            <Link to='/login'><span style={{color: '#aaa', marginRight: '8px'}}>I remembered my password</span>
            <img src='/images/arrow-to-right.svg' style={{width: '10px', marginRight: '6px'}} />
            Sign In</Link>
            <Link to='/signup'><span style={{color: '#aaa', marginRight: '8px'}}>Create new Account</span>
            <img src='/images/arrow-to-right.svg' style={{width: '10px', marginRight: '6px'}} />
            Sign Up</Link>
            <hr style={{border: 'none', borderBottom: '0.5px solid #555', marginTop: '20px'}}/>
            <Link to='/terms'>Terms of Service</Link>
            <Link to='/privacy'>Privacy</Link>
            <div style={{color: '#555', marginTop: '20px', fontSize: '11px'}}>© 2017 Pixty Inc.</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
  openModalDialog: openModal,
  closeModalDialog: closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
