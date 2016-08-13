import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

function NavBar(props) {
  let rightButtonContainer, newButton;
  if (props.authenticated) {
    rightButtonContainer = (
      <div className="right-buttons">
        <Link to="/"> <div className="auth-button" onClick={props.signoutUser}>Sign Out</div> </Link>
      </div>
    );
    newButton = (
      <Link to="/posts/new"> <div className="new-button">New</div> </Link>
    );
  } else {
    rightButtonContainer = (
      <div className="right-buttons">
        <Link to="/signin"> <div className="auth-button">Sign In</div> </Link>
        <Link to="/signup"> <div className="auth-button white">Sign Up</div> </Link>
      </div>
    );
  }

  return (
    <div className="nav-bar">
      <div className="left-buttons">
        <Link to="/"><div className="home-container"> <span className="fa fa-home fa-2x"></span> </div> </Link>
        {newButton}
      </div>
      {rightButtonContainer}
    </div>
  );
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapStateToProps, { signoutUser })(NavBar);
