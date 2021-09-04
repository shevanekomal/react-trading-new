
import './Register.css'
import {useState,useContext} from 'react'
import OTPForm from './OTPForm'
import RegisterForm from './RegisterForm';
import { FieldDataContext } from '../../context/FieldData' 
const Register = (props) => {
 const [FormData,setFormData] = useState({
    mobileNumber:{
      value:'',
      error:''
    },
    password:{
      value:'',
      error:''
    },
    confirmPassword:{
      value:'',
      error:''
    },
    loginWithOtp:{
      value:'',
      error:''
    },
  }) 
const [nextPageEnable,setNextPageEnable] = useState(false)
const {
registerUser
}=useContext(FieldDataContext)
const RegisterHandler=()=>{
        registerUser({Mobile_Number:FormData.mobileNumber.value,password:FormData.password.value}).then((result)=>{
          
            (result.status) ? props.history.push({
              pathname: '/addMember',
              state: {self:true, user_id :result.data.user_id }     //Added by swap
             
            }) : alert(result.messages || "something went wrong!!")
        })
}

    return(
      <div>{!+nextPageEnable?<RegisterForm setNextPageEnable={setNextPageEnable} RegisterHandler ={RegisterHandler} FormData={FormData} setFormData={setFormData} />:<OTPForm history={props.history} RegisterHandler={RegisterHandler}/>}</div>
    )
    
}
export default Register
