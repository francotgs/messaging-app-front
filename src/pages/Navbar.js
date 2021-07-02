import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth } = props;
  const links = auth ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="nav-wrapper blue">
      <div className="containerNav">
        <Link className="brand-logo" to="/">Messaging App</Link>
        <ul className="right">
          {links}
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.login.form.userId
  }
}

export default connect(mapStateToProps)(Navbar)