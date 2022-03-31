import React from 'react'

import Signin from '../../components/sign-in/Signin'
import Signup from '../../components/sign-up/Signup';

import "./signin-signup.styles.scss"

const SigninAndSignup = () => {
  return (
    <div className='sign-in-and-sign-up'>
        <Signin />
        <Signup />
    </div>
  )
}

export default SigninAndSignup