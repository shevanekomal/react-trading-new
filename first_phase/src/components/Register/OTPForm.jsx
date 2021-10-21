/*import {FormRow} from '../InputFields'
import { useState } from 'react'
import RegisterForm from './RegisterForm'
import {Link} from 'react-router-dom'
const OTPForm =({RegisterHandler})=> {
  const [otpmEntered,setOtpmEntered] = useState('')
    return (
      <form name='opt' className='otpForm'>
      <FormRow
          type="number"
          label="Enter OTP"
          name="otpmEntered"
          required={true}
          changeHandler={(e)=>setOtpmEntered(e.target.value)}
        />
        <div><div>Resend OTP</div><div onClick={()=>{window.location.reload()}}>Change Number</div></div>
        <button className={otpmEntered?'customButton activeButtonStyle':'customButton'}
        onClick={(e)=>{e.preventDefault(); otpmEntered && RegisterHandler()}}>Register</button></form>
    )
}
export default OTPForm */
