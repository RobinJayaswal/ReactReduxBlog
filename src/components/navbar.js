import React from 'react';
import { Link } from 'react-router';

function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/"><div className="home-container"> <span className="fa fa-home fa-2x"></span> </div> </Link>
      <Link to="/posts/new"> <div className="new-button">New</div> </Link>
    </div>
  );
}

export default NavBar;
