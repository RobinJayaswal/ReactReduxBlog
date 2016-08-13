import React from 'react';
import { signupUser } from '../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameVal: '',
      passwordVal: '',
      emailVal: '',
    };

    this.onUsernameValChange = this.onUsernameValChange.bind(this);
    this.onpasswordValChange = this.onpasswordValChange.bind(this);
    this.onEmailValChange = this.onEmailValChange.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onUsernameValChange(ev) {
    this.setState({
      usernameVal: ev.target.value,
    });
  }

  onEmailValChange(ev) {
    this.setState({
      emailVal: ev.target.value,
    });
  }

  onpasswordValChange(ev) {
    this.setState({
      passwordVal: ev.target.value,
    });
  }

  onSignup() {
    console.log('signup');
    this.props.signupUser({ email: this.state.emailVal, password: this.state.passwordVal, username: this.state.usernameVal });
  }

  onCancel() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="auth-page">
        <span>Sign Up</span>
        <div className={`auth-input-field ${this.state.showRed === 'emailVal' ? 'red' : ''}`}>
          <input placeholder="Email" value={this.state.emailVal} onChange={this.onEmailValChange} />
        </div>
        <div className={`auth-input-field ${this.state.showRed === 'usernameVal' ? 'red' : ''}`}>
          <input placeholder="Username" value={this.state.usernameVal} onChange={this.onUsernameValChange} />
        </div>
        <div className={`auth-input-field ${this.state.showRed === 'passwordVal' ? 'red' : ''}`}>
          <input placeholder="Password" value={this.state.passwordVal} onChange={this.onpasswordValChange} />
        </div>
        <div className="auth-buttons-container">
          <div className="auth-button login" onClick={this.onSignup}>
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

export default connect(null, { signupUser })(SignUp);
