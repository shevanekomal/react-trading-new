import {InputBox,Buttons,DatePickerv1,SinglSelectDropDown,FormRow} from '../InputFields'
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@autocomplete/material-ui';
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
      value:'',
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

const deleteCheckupHandler = (e) =>{
    let testName = props.location.state.testName
    props.history.push({
        pathname: '/test',
        state: {testName,user_id:props.location.state.user_id}, // added by swap
  })
}

  const onChangehandler = (event) =>{
    console.log(FormData)
    let value = event.target.value
    let error=''
    setFormData({
      ...FormData,
      [event.target.name]:{
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
    console.log(option.text)
    return option.text
  }
};
  return(
    <div>
    { (<form >
      
      <SinglSelectDropDown name='checkup_name' required={true} options={checkup_names} validate={validate}
       onChange={onChangehandler} error={FormData.checkup_name.error} placeholder={'Select at least 1 value'} >Select at least 1 value</SinglSelectDropDown>
       {FormData.checkup_name.value.includes('Others') && <FormRow
          type="text"
          label="Name"
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
        onChange={date => setStartDate(date)} 
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
        <Autocomplete
        {...defaultProps}
        id="debug"
        debug
        renderInput={(params) => <TextField {...params} placeholder="aa" margin="normal" />}
      />
        <Buttons onClick={(e)=>addCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DONE</Buttons>
        <Buttons onClick={(e)=>deleteCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DELETE</Buttons>
      </form>) }
    </div>
)}
export default CreateCheckupForm;