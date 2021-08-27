
import './Register.css'
import {useState,useContext} from 'react'
import OTPForm from './OTPForm'
import RegisterForm from './RegisterForm';
import { FieldDataContext } from '../../context/FieldData' 
const Register = (props) => {
 const [FormData,setFormData] = useState({
    mobileNumber:'',
    password:'',
    confirmPassword:'',
    loginWithOtp:'',
  }) 
const [nextPageEnable,setNextPageEnable] = useState(false)
const {
registerUser
}=useContext(FieldDataContext)
console.log(window.innerHeight)
const RegisterHandler=()=>{
        registerUser({Mobile_Number:FormData.mobileNumber,password:FormData.password}).then((result)=>{
            result.status ? props.history.push({
              pathname: '/addRisk',
              state: {self:true }
            }) : alert("something went wrong!!")
        })
}
    return(
      <div>{!+nextPageEnable?<RegisterForm setNextPageEnable={setNextPageEnable} RegisterHandler ={RegisterHandler} FormData={FormData} setFormData={setFormData} />:<OTPForm history={props.history} RegisterHandler={RegisterHandler}/>}</div>
    )
    
}
export default Register
