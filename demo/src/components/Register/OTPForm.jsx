import {FormRow} from '../InputFields'

const OTPForm =({RegisterHandler})=> {
    return (
      <form name='opt' className='Register'>
      <FormRow
          type="number"
          label="Enter OTP"
          name="otpmEntered"
          required={true}
          //changeHandler={(e)=>onChangehandler(e)}
        />
        <div><span>Resend OTP</span><span>Change Number</span></div>
        <button 
        onClick={(e)=>RegisterHandler(e)}>Register</button></form>
    )
}
export default OTPForm
