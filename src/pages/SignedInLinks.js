import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogoutSuccess, userLogout } from '../redux'


const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/menu'>Menu</NavLink></li>
        <li>
          <button
            type="button"
            className="link-button"
            onClick={() => { props.userLogoutSuccess(); props.userLogout() }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogoutSuccess: () => dispatch(userLogoutSuccess()),
    userLogout: () => dispatch(userLogout())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)

