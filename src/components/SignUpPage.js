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


class SignUpPage extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.currentUser = new CurrentUser();
    this.state = { token: this.currentUser.getToken(), email: null, password: null, company: null,
      accepted: false, password_confirmation: null, loggin: false };
  }

  signIn() {
    this.setState({ loggin: true });
    postSession(this.state.login, this.state.password).then(response => {
      const sessionId = response.response.sessionId;
      const user = response.response.user;

      this.setState(() => ({ loggin: false }));

    }, error => {
      this.setState(() => ({ loggin: false }));
      this.props.openModalDialog('error', <div style={{padding: '10px', paddingBottom: '0px'}}>
        Password to short, mast be at least 8 characters.<br/>
        <div onClick={this.props.closeModalDialog.bind(this, 'error')} style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
          <RegularButton>OK</RegularButton>
        </div>
      </div>);
    });
  }

  toggleCheckbox = () => {
    this.setState({accepted: !this.state.accepted});
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
      <div style={{width: '100%', minHeight: '650px', height: '100%', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <img src={logo} alt='Pixty' style={{width: '130px'}}/>
          <form action='' onSubmit={(event) => event.preventDefault()}>
          <div style={{paddingBottom: '0px'}}>
            <FormInput onChange={this.onChange.bind(this, 'email')} label="Email"></FormInput>
            <FormInput onChange={this.onChange.bind(this, 'password')} label="Password" password></FormInput>
            <FormInput onChange={this.onChange.bind(this, 'password_confirmation')} label="Confirm Password" password></FormInput>
            <div style={{paddingTop: '10px', paddingBottom: '0px', color: '#999', fontSize: '12px'}}>
              On behalf of the company
            </div>
            <FormInput onChange={this.onChange.bind(this, 'company')} label="Company name"></FormInput>
          </div>

          <div style={{paddingTop: '10px', paddingBottom: '30px', color: '#777', fontSize: '12px'}}>
            <label><input onClick={this.toggleCheckbox} type='checkbox' checked={this.state.accepted ? true : false} />
            Click here to indicate that you have read<br/>
            and agree to the terms presented in the Terms<br/>
            and Conditions agreement</label>
          </div>
          <Button type='submit' disabled={this.state.accepted ? false : true}  onClick={this.signIn.bind(this)}>
            { this.state.loggin ?
            <div style={{transform: 'scale(0.3)', position: 'absolute', marginLeft: '-4px'}}><Spinner stroke={4} noLabel /></div> : null }
            <div className="button__text" style={{marginLeft: this.state.loggin ? '19px' : '0px'}}>Create Account</div>
          </Button>
          </form>

          <div style={{paddingTop: '20px'}}>
            <Link to='/forgot'><span style={{color: '#aaa', marginRight: '8px'}}>Forgot your Password?</span> Restore</Link>
            <Link to='/login'><span style={{color: '#aaa', marginRight: '8px'}}>Already has Account</span> Sign In</Link>
            <hr style={{border: 'none', borderBottom: '1px dotted #222', marginTop: '20px'}}/>
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
)(SignUpPage);
