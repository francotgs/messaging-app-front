import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/menu'>Menu</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks
