
import {FormRow,RadioButton} from '../InputFields'
import {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import AddForm from '../AddForm/AddForm'
import { validate } from '@babel/types';

const AddDetails = () =>{
  const [isNumberIsDiff,setIsNumberDiff] = useState(false)
  const [nextPageEnable,setNextPageEnable] = useState(false)
  const [isValidate,setValidate] = useState(false)
  const [FormData,setFormData] = useState({
    name:'',
    whatsappNo:''
  }) 
  
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
    {!nextPageEnable ?(<form >
      <FormRow
          type="text"
          label="Name"
          name="name"
          maxLength = {10}
          required={true}
          changeHandler={onChangehandler}
        />
        <RadioButton name={'addNewField1'} required={true}  options={[ {text:'yes',value:'yes'}, {text:'No',value:'no'}]} onChange={(e)=>{
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
        
        <button className={validate ? 'activeButtonStyle' : ''} onClick={(e)=>{
          e.preventDefault()
          isValidate && setNextPageEnable(true)
        }} >Continue</button>
      </form>):<AddForm /> }
</div>
)}
export default AddDetails;