
import {FormRow,RadioButton,SinglSelectDropDown} from '../InputFields'
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
if(!isValidate){
  data = {
    name:FormData.name.value,
    Number:FormData.Number.value,
    whatsAppNumber:FormData.whatsAppNumber.value,
    userType:self ? 'user' : 'subUser',
    Relation:self ? FormData.Relation.value: '',
}
addMember(data).then((response)=>{
  if(response.status){
    props.history.push({
          pathname: '/addRisk',
          state: {self}
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
        <SinglSelectDropDown name={'Realtion'} required={true} options={[{text:'Sister',value:'sister'},{text:'Mother',value:'mother'}]} >Relation</SinglSelectDropDown>

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
        <button className={isValidate?'customButton activeButtonStyle':'customButton'} onClick={(e)=>addMemberHandler(e)} >{!self?'Add Member':'Continue'}</button>
      </form>) }
    </div>
)}
export default AddMemberForm;