import React, { Component } from 'react'
import {FormRow,CheckboxesGroup} from '../InputFields'
import './Login.css'

import { Link } from "react-router-dom";
const activeButtonStyle = {
  position: 'static',
width: '90px',
height: '40px',

/* Yellow Secondary */
background: '#F9E24D',
borderRadius: '6px',
}
const validate = true; //validate for required
export default class index extends Component {
  render() {
    return (
      
      <form name='Login' className='Login'>
      <FormRow
          type="number"
          label="Mobile number"
          name="mobileNumber"
          maxlength = {10}
          required={true}
          //changeHandler={this.onChangehandler}
        />
         <FormRow
          type="password"
          label="Create Password"
          name="password"
          //changeHandler={this.onChangehandler}
        />
        <CheckboxesGroup name='loginWithOtp'  options={[ {text:'Login with OTP instead of password',name:'loginWithOtp',checkd:false}]} />
          
        <p>Note: If you are the account creator, login using your password or OTP. 
If you are a family member, login using the OTP.</p>
        <button style={validate?activeButtonStyle:""}>LOGIN</button>
        <p>New here? <Link
            to="/register" >Register Now</Link></p>
      </form>
    )
  }
}
