
import './Register.css'
import {useState,useContext} from 'react'
import OTPForm from './OTPForm'
import RegisterForm from './RegisterForm';
import { FieldDataContext } from '../../context/FieldData' 
import Loader from '../../utility/Loader'
import {Alerts} from '../InputFields'
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
  const [open, setOpen] = useState(false);
  let alertMsg='';
const [nextPageEnable,setNextPageEnable] = useState(false)
const {
registerUser
}=useContext(FieldDataContext)
const [isLoaded,setLoader] =useState(false)
const RegisterHandler=()=>{
  setLoader(true)
        registerUser({Mobile_Number:FormData.mobileNumber.value,password:FormData.password.value}).then((result)=>{
           if(result.status){
            props.history.push({
              pathname: '/addMemberself',
              state: {self:true, user_id :result.data.user_id }     //Added by swap
             
            })
           }else {
            alertMsg = result.messages || "something went wrong!!"
            setOpen(true)
           }
          
            setLoader(false)
        })
        setLoader(false)
}

    return(
      <div><Loader text='Registration in progress..' loaded={isLoaded}/>{!+nextPageEnable?<RegisterForm setNextPageEnable={setNextPageEnable} RegisterHandler ={RegisterHandler} FormData={FormData} setFormData={setFormData} />:<OTPForm history={props.history} RegisterHandler={RegisterHandler}/>}
       { open &&  <Alerts handleClose={()=>setOpen(false)} content = {'Mobile number already exist'}
           isOpen={open} type="error" title="Error" />}
      </div>
    )
    
}
export default Register
