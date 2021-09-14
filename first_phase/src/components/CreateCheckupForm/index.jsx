import {InputBox,Buttons,DatePickerv1,SinglSelectDropDown,FormRow} from '../InputFields'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React,{useState,useEffect,useContext} from 'react'
import { FieldDataContext } from '../../context/FieldData'
import Grid from '@material-ui/core/Grid';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CreateCheckupForm = (props) =>{

  const {
    checkup_names
  } = useContext(FieldDataContext)
  const [isValidate,setValidate] = useState(false)
  const {
    createCheckup
  } = useContext(FieldDataContext)
  const [FormData,setFormData] = useState({
    checkup_name:{
      value:props.location.state.checkup_name,
      error:''
    },
    self_checkup_name:{
      value:'',
      error:''
    },
    date:{
      value:'',
      error:''
    },
    provider:{
      value:'',
      error:''
    },
    provider_website:{
      value:'',
      error:''
    },
  }) 
  const {self} = props.location.state
  useEffect(() => {
    let tempValidate = true 
    for (const [key, value] of Object.entries(FormData)) {
     
    }
    setValidate(tempValidate)
  }, [FormData])
  
const addCheckupHandler = (e) =>{
  e.preventDefault()
  let data = {}
if(isValidate){
  data = {
    checkup_name:FormData.checkup_name.value,
    date:FormData.date.value,
    provider:FormData.provider.value,
    provider_website:FormData.provider_website.value,
    user_id:props.location.state.user_id,  // added by swap
}
console.log(data)
/*createCheckup(data).then((response)=>{
  if(response.status){
      let testName = props.location.state.testName
    props.history.push({
        pathname: '/test',
        state: {testName,user_id:props.location.state.user_id}, // added by swap
  })
  } 
})*/
}
}

const deleteOrCancelCheckupHandler = (e) =>{
    let testName = props.location.state.testName
    if(testName != undefined){
     // give backend call to delete checkup date
      props.history.push({
        pathname: '/test',
        state: {testName,user_id:props.location.state.user_id}, // added by swap
    })
    }else{
      //self added chekcup from health plan page 
      props.history.push({
        pathname: '/healthPlan',
        state: {user_id:props.location.state.user_id}, // added by swap 
      })
    }
   
}

  const onChangehandler = (event) =>{
    let value = '', name=''
    if(event.target.name != undefined){
      value = event.target.value
      name = event.target.name
    }else{
      value = event.target.textContent
      name = 'checkup_name'
    }
    let error=''
    setFormData({
      ...FormData,
      [name]:{
        value,
        error,
      }
    })
    
  }
  const validate =(e)=>{
   
  }
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [startDate, setStartDate] = useState(null);
  const handleDateChange = (date) => {
    setStartDate(date)
   setSelectedDate(date);

  let error = ''
  let value = date;

  setFormData({
    ...FormData,
    ['date']:{
        value,
        error:error
    }
    })

};
const defaultProps = {
  options: checkup_names,
  getOptionLabel: (option) => {
    return option.text
  }
};
  return(
    <div>
    { (<form >
     { props.location.state.testName ?<label>{FormData.checkup_name.value}</label>  : <Autocomplete
        {...defaultProps}
        style={{ width: 300 }}
        id="checkup_name"
        name='checkup_name'
        required={true}
        validate={validate}
        onChange={onChangehandler} error={FormData.checkup_name.error}
        renderInput={(params) => <TextField {...params} name='checkup_name' placeholder="Type Checkup Name" margin="normal" />}
      /> }
     {/*  <SinglSelectDropDown name='checkup_name' required={true} options={checkup_names} validate={validate}
       onChange={onChangehandler} error={FormData.checkup_name.error} placeholder={'Select at least 1 value'} >Select at least 1 value</SinglSelectDropDown>*/}
       {FormData.checkup_name.value.includes('Others') && <FormRow
          type="text"
          label="Enter Checkup Name"
          name="self_checkup_name"
          required={true}
          changeHandler={onChangehandler}
        />}
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <DateRangeIcon />
            </Grid>
          <Grid item>
        <DatePicker 
        name='date'
        selected={startDate} 
        required={true}
        dateFormat="dd/MM/yyyy"
        placeholder="Add Date"
        onChange={date => handleDateChange(date)} 
        />
           </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <RoomIcon />
            </Grid>
          <Grid item>
          <InputBox
          name="provider"
          placeholder="Add Provider"
          required={true}
          changeHandler={onChangehandler}
        />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <AttachmentOutlinedIcon />
            </Grid>
          <Grid item>
         <InputBox
          name="provider_website"
          placeholder="Add Provider Website"
          required={true}
          changeHandler={onChangehandler}
        />
         </Grid>
        </Grid>
        
        <Buttons onClick={(e)=>addCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DONE</Buttons>
        <Buttons onClick={(e)=>deleteOrCancelCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>{props.location.state.testName ? 'DELETE':'CANCEL'}</Buttons>
      </form>) }
      
    </div>
)}
export default CreateCheckupForm;