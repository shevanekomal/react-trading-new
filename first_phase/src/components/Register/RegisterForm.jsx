import {FormRow,CheckboxesGroup} from '../InputFields'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useWindowSize} from '../../utility'
const RegisterForm =({FormData,setFormData,setNextPageEnable,RegisterHandler})=>{
  const [isValidate,setValidate] = useState(false)
  const [width, height] = useWindowSize();
  useEffect(() => {
      let tempValidate = true
      for (const [key, value] of Object.entries(FormData)) {
        if(!value){
          setValidate(false)
          return;
        }
      }
      setValidate(tempValidate)
  }, [FormData])

  const onChangehandler = (event) =>{
    let value = event.target.value
    if(event.target.name === 'loginWithOtp'){
      value=event.target.checked
    }
    setFormData({
      ...FormData,
      [event.target.name]:value
    })
  }
  return(
      <form name='Register' className='Register'>
      {width> 990 && <div className='Header'>Register</div>}
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
            required={true}
            changeHandler={(e)=>onChangehandler(e)}
          />
          <FormRow
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            required={true}
            changeHandler={(e)=>onChangehandler(e)}
          />
          <p><CheckboxesGroup name='loginWithOtp'  onChange={(e)=>onChangehandler(e)} options={[ {text:'By signing up, I agree to the terms',name:'By signing up, I agree to the terms'}]} /></p>
          <button onClick={(e)=>{
            e.preventDefault()
            isValidate && RegisterHandler() //setNextPageEnable(true)
          }} className={isValidate?'customButton activeButtonStyle':'customButton'}>Register</button>
          <p>Already have an account? <Link
              to="/login" >Login Now</Link></p>
      </form>
)}
export default RegisterForm