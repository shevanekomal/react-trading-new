import {FormRow,CheckboxesGroup} from '../InputFields'
import './Login.css'
import { Link } from "react-router-dom";
import { FieldDataContext } from '../../context/FieldData' 
import {useState,useContext,useEffect} from 'react'
 

const Login =(props)=> {
const {
loginUser,
updateUserId
}=useContext(FieldDataContext)

const [FormData,setFormData] = useState({
    mobileNumber:'',
    password:'',
  }) 
   const onChangehandler = (event) =>{
    setFormData({
      ...FormData,
      [event.target.name]:event.target.value
    })
  }
  const LoginHandler=(e)=>{
        e.preventDefault()
        isValidate && loginUser({Mobile_Number:FormData.mobileNumber,password:FormData.password}).then((result)=>{
         console.log('result'+result)
        if(result.status){
          console.log(result.data.user_id)
            updateUserId(result.data.user_id)
            props.history.push({
              pathname: '/userHome',
            state: { self:true,user_id:result.data.user_id }
            })
        }else{
          alert("Login failed.Please try again!!")
        }
        })
}
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

    return (
      <form name='Login' className='Login'>
      <FormRow
          type="number"
          label="Mobile number"
          name="mobileNumber"
          maxLength = {10}
          required={true}
          changeHandler={(e)=>onChangehandler(e)}
        />
         <FormRow
          type="password"
          label="Create Password"
          name="password"
          changeHandler={(e)=>onChangehandler(e)}
        />
       { /*<CheckboxesGroup name='loginWithOtp'  options={[ {text:'Login with OTP instead of password',name:'loginWithOtp',checkd:false}]} />
          
        <p>Note: If you are the account creator, login using your password or OTP. 
    If you are a family member, login using the OTP.</p>*/}
    <Link to="/shareWithMember">Am I an account creater or family member?</Link>
        <button className={isValidate?'customButton activeButtonStyle':'customButton'}
        onClick={(e)=>LoginHandler(e)}>LOGIN</button>
        <p>New here? <Link
            to="/register" >Register Now</Link></p>
      </form>
    )
}
export default Login