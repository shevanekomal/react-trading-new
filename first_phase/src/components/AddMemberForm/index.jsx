
import {FormRow,RadioButton,SinglSelectDropDown,Buttons} from '../InputFields'
import {useState,useEffect,useContext} from 'react'
import { FieldDataContext } from '../../context/FieldData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const AddMemberForm = (props) =>{
  const [isNumberIsDiff,setIsNumberDiff] = useState(true)
  const [isValidate,setValidate] = useState(false)
  const {
    addMember
  } = useContext(FieldDataContext)
  const [FormData,setFormData] = useState({
    name:{
      value:'',
      error:''
    },
    whatsAppNumber:{
      value:'',
      error:''
    },
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
      if(!(isNumberIsDiff == false && key === 'whatsAppNumber') && !value.value || !!value.error){
        setValidate(false)
        return;
      }
      if(key === 'name' && value.value=== ''){
        setValidate(false)
        return;
      }
      if(key === 'whatsAppNumber' && isNumberIsDiff == true && value.value=== ''){
        setValidate(false)
        return;
      }
    }
    setValidate(tempValidate)
  }, [FormData,isNumberIsDiff])
  
const addMemberHandler = (e) =>{
  e.preventDefault()
  let data = {}
if(isValidate){
  data = {
    name:FormData.name.value,
    Number:FormData.Number.value,
    whatsAppNumber:FormData.whatsAppNumber.value,
    userType:self ? 'user' : 'subUser',
    Relation:!self ? FormData.Relation.value: '',
    user_id:props.location.state.user_id,  // added by swap
}

addMember(data).then((response)=>{
  if(response.status){
    props.history.push({
          pathname: '/addRisk',
          state: {self,user_id:response.data.user_id}, // added by swap
        })
  } 
})
}
}
  const onChangehandler = (event) =>{
    let value = event.target.value
    let error=''
    if((event.target.name ==='Number' || event.target.name ==='whatsAppNumber') && value.length < 10){
         error = 'Please enter valid Mobile number'
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
    <div>
    { (<form >
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
          label="Number"
          name="Number"
          required={true}
          changeHandler={onChangehandler}
          error={FormData.Number.error}
          onInput = {(e) =>{ 
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            }}
        />
        <SinglSelectDropDown name={'Relation'} required={true} onChange ={onChangehandler} options={[{text:'Sister',value:'sister'},{text:'Mother',value:'mother'}]} >Relation</SinglSelectDropDown>

        </>}
        <br/>
        <RadioButton name={'addNewField1'} required={true}  options={[ {text:'yes',value:'yes'}, {text:'No',value:'no'}]} defaultValue={'yes'} onChange={(e)=>{
          e.target.value === 'yes' ? setIsNumberDiff(true) : setIsNumberDiff(false)
        }}>Is the phone number you used to register different than your whatsapp number ?</RadioButton>
        {isNumberIsDiff && (<><FormRow
          type="number"
          label="whatsApp Number"
          name="whatsAppNumber"
          maxLength = {10}
          required={true}
          changeHandler={onChangehandler}
          onInput = {(e) =>{ 
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            }}
            error={FormData.whatsAppNumber.error}
        /><FontAwesomeIcon icon={faInfoCircle} color="#17416B" size={'1x'} /></>)}
        <Buttons onClick={(e)=>addMemberHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>{!self?'Add Member':'Continue'}</Buttons>
      </form>) }
    </div>
)}
export default AddMemberForm;