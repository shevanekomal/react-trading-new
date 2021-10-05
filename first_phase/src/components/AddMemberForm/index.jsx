
import {FormRow,RadioButton,SinglSelectDropDown,Buttons} from '../InputFields'
import {useState,useEffect,useContext} from 'react'
import { FieldDataContext } from '../../context/FieldData'
import {useWindowSize} from '../../utility'
import { Link } from "react-router-dom";
import jeevi_on_skates from '../../assets/jeevi_on_skates.svg'

const AddMemberForm = (props) =>{
  const [width] = useWindowSize();
  const [isNumberIsDiff,setIsNumberDiff] = useState(false)
  const [isValidate,setValidate] = useState(false)
  const {
    addMember
  } = useContext(FieldDataContext)
  const [FormData,setFormData] = useState({
    name:{
      value:'',
      error:''
    },
  /*  whatsAppNumber:{
      value:'',
      error:''
    },*/
    Number:{
      value:'',
      error:''
    },
    Relation:{
      value:'sister',
      error:''
    },
  }) 
  const {self} = props.location.state
  useEffect(() => {
    let tempValidate = true 
    for (const [key, value] of Object.entries(FormData)) {
      if( (!self && key !== 'Number') && !(isNumberIsDiff == false && key === 'whatsAppNumber') && !value.value || !!value.error){
        setValidate(false)
        return;
      }
      if(key === 'name' && value.value=== ''){
        setValidate(false)
        return;
      }
      if(key === 'Number' && value.value=== ''){
        setValidate(false)
        return;
      }
     /* if(key === 'whatsAppNumber' && isNumberIsDiff == true && value.value=== ''){
        setValidate(false)
        return;
      }*/
    }
    setValidate(tempValidate)
    //console.log(isValidate)
  }, [FormData,isNumberIsDiff])

  useEffect(() => {
    window.onbeforeunload = function() {
        return true;
    };

    return () => {
        window.onbeforeunload = null;
    };
}, []);
  
const addMemberHandler = (e) =>{
  e.preventDefault()
  let data = {}
if(isValidate){
  data = {
    name:FormData.name.value,
    Number:FormData.Number.value,
    //whatsAppNumber:FormData.whatsAppNumber.value,
    userType:self ? 'user' : 'subUser',
    Relation:!self ? FormData.Relation.value: '',
    user_id:props.location.state.user_id,  // added by swap
}

addMember(data).then((response)=>{
  if(response.status){
  /*  if(self){
      props.history.push({
        pathname: '/addRiskSelf',
        state: {self,user_id:response.data.user_id}, // added by swap
      })
    }else{
      props.history.push({
        pathname: '/addRisk',
        state: {self,user_id:response.data.user_id}, // added by swap
      })
    }*/
    props.history.push({
      pathname: '/addRisk',
      state: {self,user_id:response.data.user_id}, // added by swap
    })
   
  } else {
    props.history.push('/login')
  }
})
}
}
  const onChangehandler = (event) =>{
    let value = event.target.value
    let error=''
    if(event.target.name ==='Number' && value.length < 10){
         error = 'Please enter valid mobile number'
        }
    setFormData({
      ...FormData,
      [event.target.name]:{
        value,
        error,
      }
    })
  }
  return(
    
    <div className = 'AddMemberContainer'>
      <form>
      <div>
      {width> 990 && <div className='Header'>{self ? "Let's Start" : 'Add Member'}</div>}
      <FormRow
          type="text"
          label="Name"
          name="name"
          required={true}
          changeHandler={onChangehandler}
        />
        {
        !self && <>
          <FormRow
          type="number"
          label="Phone number"
          name="Number"
          required={true}
          changeHandler={onChangehandler}
          error={FormData.Number.error}
          isTooltip = {true}
          tooltipTitle = {'If the member does not have a phone number, you can use your own phone number to register the member.'}
          onInput = {(e) =>{ 
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            }}
        />
        
        <SinglSelectDropDown name={'Relation'} required={true} onChange ={onChangehandler}  isTooltip = {true} 
        tooltipTitle = {'This helps us in giving you relevant recommendations.'} options={[{text:'Sister',value:'sister'},{text:'Mother',value:'mother'},{text:'Brother',value:'brother'},{text:'Father',value:'father'},{text:'Son',value:'son'},{text:'Daughter',value:'daughter'}
        ,{text:'Wife',value:'wife'},{text:'Husband',value:'husband'}]} >Relation</SinglSelectDropDown>
        </>}
        <br/>
        { /*
        <RadioButton name={'addNewField1'} required={true}  options={[ {text:'yes',value:'yes'}, {text:'No',value:'no'}]} defaultValue={'no'} onChange={(e)=>{
          e.target.value === 'yes' ? setIsNumberDiff(true) : setIsNumberDiff(false)
        }}>{self ?('Is the phone number you used to register different than your whatsapp number?') :('Is the phone number above different than the members WhatsApp number?') } 
        </RadioButton>
        {isNumberIsDiff && <FormRow
          type="number"
          label="WhatsApp number"
          name="whatsAppNumber"
          maxLength = {10}
          required={true}
          changeHandler={onChangehandler}
          onInput = {(e) =>{ 
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            }}
            error={FormData.whatsAppNumber.error}
            isTooltip = {true}
            tooltipTitle={'We will use this number to send reminders about your checkups. You can switch off & control what notifications you get later.'}
            
        />}
        */}
        { /*
          !self && <div className='container'> <Link to="/shareWithMember">Am I an account creater or family member?</Link></div>
        */}
        <Buttons onClick={(e)=>addMemberHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>{!self?'Add Member':'Continue'}</Buttons>
        </div>
      </form>
      { /* width> 990 && <img className='jeevi_on_skates' src={jeevi_on_skates} /> */}

      { <img className='jeevi_on_skates' src={jeevi_on_skates} />}
      </div>


)}
export default AddMemberForm;