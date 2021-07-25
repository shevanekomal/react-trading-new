import {FormRow} from '../InputFields'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
const RegisterForm =({FormData,setFormData,setNextPageEnable})=>{
 
  
  const [isValidate,setValidate] = useState(false)

  useEffect(() => {
      let tempValidate = true
      for (const [key, value] of Object.entries(FormData)) {
        if(value===''){
          setValidate(false)
          return;
        }
      }
      setValidate(tempValidate)
  }, [FormData])
  const onChangehandler = (event) =>{
    setFormData({
      ...FormData,
      [event.target.name]:event.target.value
    })
  }
  return(
<form name='Register' className='Register'>
      <FormRow
          type="number"
          label="Mobile number"
          name="mobileNumber"
          maxlength = {10}
          required={true}
          changeHandler={(e)=>onChangehandler(e)}
        />
         <FormRow
          type="password"
          label="Create Password"
          name="password"
          changeHandler={(e)=>onChangehandler(e)}
        />
         <FormRow
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          changeHandler={(e)=>onChangehandler(e)}
        />
        <p>By signing up, I agree to the terms</p>
        <button onClick={(e)=>{
          e.preventDefault()
          isValidate && setNextPageEnable(true)
        }} className={isValidate?'activeButtonStyle':''}>GET OTP</button>
        <p>Already have an account? <Link
            to="/login" >Login Now</Link></p>
      </form>
)}
export default RegisterForm