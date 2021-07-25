
import './Register.css'
import {useState} from 'react'
import OTPForm from './OTPForm'
import RegisterForm from './RegisterForm';

import { FieldDataContext } from '../../context/FieldData' 
import {useContext} from 'react'
const Register = (props) => {
 const [FormData,setFormData] = useState({
    mobileNumber:'',
    password:'',
    confirmPassword:'',
  }) 
const [nextPageEnable,setNextPageEnable] = useState(false)
const {
registerUser
}=useContext(FieldDataContext)

const RegisterHandler=(e)=>{
        e.preventDefault()
        registerUser({Mobile_Number:FormData.mobileNumber,password:FormData.password}).then((result)=>{
result.status ? props.history.push("/fillDetails") : alert("something went wrong!!")
        })
        
}
    return(
      <div>{!+nextPageEnable?<RegisterForm setNextPageEnable={setNextPageEnable} FormData={FormData} setFormData={setFormData} />:<OTPForm history={props.history} RegisterHandler={RegisterHandler}/>}</div>
    )
    
}
export default Register
