import {FormRow} from '../InputFields'
import './Register.css'

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
const Register = () => {
    return (
      <form name='Register' className='Register'>
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
         <FormRow
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          //changeHandler={this.onChangehandler}
        />
        <p>By signing up, I agree to the terms</p>
        <button style={validate?activeButtonStyle:""}>GET OTP</button>
        <p>Already have an account? <Link
            to="/login" >Login Now</Link></p>
      </form>
    )
}
export default Register
