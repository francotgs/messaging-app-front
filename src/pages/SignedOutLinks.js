import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink exact to="/">Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks
