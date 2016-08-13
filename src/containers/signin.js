import React from 'react';
import { signinUser } from '../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameVal: '',
      passwordVal: '',
    };

    this.onUsernameValChange = this.onUsernameValChange.bind(this);
    this.onpasswordValChange = this.onpasswordValChange.bind(this);
    this.onSignin = this.onSignin.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onUsernameValChange(ev) {
    this.setState({
      usernameVal: ev.target.value,
    });
  }

  onpasswordValChange(ev) {
    this.setState({
      passwordVal: ev.target.value,
    });
  }

  onSignin() {
    this.props.signinUser({ email: this.state.usernameVal, password: this.state.passwordVal });
  }

  onCancel() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="auth-page">
        <span>Sign In</span>
        <div className={`auth-input-field ${this.state.showRed === 'usernameVal' ? 'red' : ''}`}>
          <input placeholder="Email" value={this.state.usernameVal} onChange={this.onUsernameValChange} />
        </div>
        <div className={`auth-input-field ${this.state.showRed === 'passwordVal' ? 'red' : ''}`}>
          <input placeholder="Password" value={this.state.passwordVal} onChange={this.onpasswordValChange} />
        </div>
        <div className="auth-buttons-container">
          <div className="auth-button login" onClick={this.onSignin}>
            <span>Submit</span>
          </div>
          <div className="auth-button cancel" onClick={this.onCancel}>
            <span>Cancel</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signinUser })(SignIn);
