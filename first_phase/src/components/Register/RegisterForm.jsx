import {FormRow,CheckboxesGroup,Buttons} from '../InputFields'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useWindowSize} from '../../utility'
import jeevi_register from '../../assets/jeevi_register.png'
const RegisterForm =({FormData,setFormData,setNextPageEnable,RegisterHandler})=>{
  const [isValidate,setValidate] = useState(false)
  const [width, height] = useWindowSize();
  useEffect(() => {
      let tempValidate = true
      let password = '',cpassword = '';
      for (const [key, value] of Object.entries(FormData)) {
        if(!value.value || !!value.error){
          setValidate(false)
          return;
        }
        if(key === 'confirmPassword'){
          cpassword = value.value;
        }
        if(key === 'password'){
          password = value.value;
        }
      }
      if(password !== cpassword){
        setValidate(false)
        return;
      }
      setValidate(tempValidate)
  }, [FormData])

  const onChangehandler = (event) =>{
    let value = event.target.value
    let error=''
    if(event.target.name === 'loginWithOtp'){
      value=event.target.checked
    }
   /* console.log(FormData.confirmPassword)
    if(event.target.name ==='password' && FormData.confirmPassword.value != '' && value!= FormData.confirmPassword.value){
      //error = 'Password and Confirm Password should be same'
     
    }else if(event.target.name ==='confirmPassword' && value === FormData.password.value){
      console.log('in else')
      error = ''
      let val = FormData.password.value
      setFormData({
        ...FormData,
        ['password']:{
          val,
          error
        }
      })
    }*/
       
    if(event.target.name ==='mobileNumber' && value.length < 10){
         error = 'Please enter valid Mobile number'
        }
    if(event.target.name ==='confirmPassword' && value!= FormData.password.value){
      error = 'Password and Confirm Password should be same'
    }
   
    setFormData({
      ...FormData,
      [event.target.name]:{
        value,
        error
      }
    })
  }
  return(
    <div className = 'RegisterContainer'>
      <form name='Register' className='Register'>
      <div>
      {width> 990 && <div className='Header'>Register</div>}
      <FormRow
            type="number"
            label="Mobile number"
            name="mobileNumber"
            required={true}
            changeHandler={(e)=>onChangehandler(e)}
            error = {FormData.mobileNumber.error}
            onInput = {(e) =>{ 
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            }}
          />
          <FormRow
            type="password"
            label="Create Password"
            name="password"
            required={true}
            changeHandler={(e)=>onChangehandler(e)}
            error = {FormData.password.error}
          />
          <FormRow
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            required={true}
            error = {FormData.confirmPassword.error}
            changeHandler={(e)=>onChangehandler(e)}
            
          />
         <p><CheckboxesGroup name='loginWithOtp'  onChange={(e)=>onChangehandler(e)} options={[ {text:'By using HiJeevan, you confirm that you accept our ',name:'By using HiJeevan, you confirm that you accept our '}]} />
         <a style={{color:'blue'}} href="https://www.hijeevan.com/privacy-policy" target='_blank'>
         Privacy Policy
          </a>
         </p>
         <Buttons onClick={(e)=>{
            e.preventDefault()
            isValidate && RegisterHandler() //setNextPageEnable(true)
          }}  disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>Register</Buttons>
          <p>Already have an account? <Link
              to="/login" >Login Now</Link></p>
             
         </div>
      </form>
      {<img className='jeevi_register' src={jeevi_register} />}
      </div>
)}
export default RegisterForm