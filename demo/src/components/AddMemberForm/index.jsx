
import {FormRow,RadioButton,SinglSelectDropDown} from '../InputFields'
import {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const AddMemberForm = (props) =>{
  const [isNumberIsDiff,setIsNumberDiff] = useState(true)
  const [isValidate,setValidate] = useState(false)
  const [FormData,setFormData] = useState({
    name:'',
    whatsAppNumber:'',
    Number:'',
    Relation:''
  }) 
  const {self} = props.location.state
  useEffect(() => {
      let tempValidate = true
      for (const [key, value] of Object.entries(FormData)) {
        if(key === 'name' && value=== ''){
          setValidate(false)
          return;
        }
        if(key === 'name' && isNumberIsDiff == true && value=== ''){
          setValidate(false)
          return;
        }
      }
      setValidate(tempValidate)
  }, [FormData])

  const onChangehandler = (event) =>{
    setFormData({
      ...FormData,
      [event.target.name]:event.target.value
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
        {!self && <>
          <FormRow
          type="number"
          label="Number"
          name="Number"
          required={true}
          changeHandler={onChangehandler}
        />
        <SinglSelectDropDown name={'Realtion'} required={true} options={[{text:'Sister',value:'sister'},{text:'Mother',value:'mother'}]} >Pick your location</SinglSelectDropDown>
          

        </>}
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
        /><FontAwesomeIcon icon={faInfoCircle} color="#17416B" size={'1x'} /></>)}
        <button className={isValidate?'customButton activeButtonStyle':'customButton'} onClick={(e)=>{
          e.preventDefault()
          
          isValidate &&  props.history.push({
          pathname: '/addRisk',
          state: { ...FormData,self}
        })
        }} >{!self?'Add Member':'Continue'}</button>
      </form>) }
    </div>
)}
export default AddMemberForm;