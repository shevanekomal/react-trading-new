
import './Register.css'
import {useState} from 'react'
import OTPForm from './OTPForm'
import RegisterForm from './RegisterForm';
const Register = (props) => {
const [nextPageEnable,setNextPageEnable] = useState(false)
    return(
      <div>{!+nextPageEnable?<RegisterForm setNextPageEnable={setNextPageEnable} />:<OTPForm history={props.history} />}</div>
    )
    
}
export default Register
