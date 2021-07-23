import {FormRow} from '../InputFields'
const OTPForm =(props)=> {
  console.log(props)
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
        onClick={(e)=> {
        e.preventDefault()
        props.history.push("/fillDetails");
        }
        } >Register</button></form>
    )
}
export default OTPForm
