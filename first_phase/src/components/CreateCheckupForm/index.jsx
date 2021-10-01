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
import './CreateCheckupForm.css';
const CreateCheckupForm = (props) =>{
 
  const {
    checkup_names,
    createSelfAddedPlan,
    createEvent
  } = useContext(FieldDataContext)
  const [isValidate,setValidate] = useState(false)
  
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
  
  useEffect(() => {
    window.onbeforeunload = function() {
        return true;
    };

    return () => {
        window.onbeforeunload = null;
    };
}, []);

const addCheckupHandler = (e) =>{
  e.preventDefault()
  let data = {}
if(isValidate){
  let checkup_name = ''
  if(FormData.checkup_name.value.includes('Others')){
    checkup_name = FormData.self_checkup_name.value
  }else
  checkup_name = FormData.checkup_name.value  
  data = {
    checkup_name:checkup_name,
   // date:FormData.date.value,
   date:selectedDate,
    provider:FormData.provider.value,
    provider_website:FormData.provider_website.value,
    user_id:props.location.state.user_id,
    checkup_id:props.location.state.checkup_id
}
//console.log(props.location.state.checkup_id)
if(props.location.state.checkup_id !== undefined&& props.location.state.checkup_id !== ''){
  let checkup_name = props.location.state.checkup_name
  let testName = props.location.state.testName
  let checkup_id = props.location.state.checkup_id
  createEvent(data).then((response)=>{
    if(response.status){ 
      props.history.push({
          pathname: '/test',
          state: {checkup_id,checkup_name,testName,user_id:props.location.state.user_id}, // added by swap
    })
    } 
  });
  
}else{
  createSelfAddedPlan(data).then((response)=>{
    if(response.status){
      props.history.push({
        pathname: '/healthPlan',
        state: {user_id:props.location.state.user_id}, // added by swap 
      })
    }
  })
}

}
/*props.history.push({
  pathname: '/calender',
  //state: {testName,user_id:props.location.state.user_id}, // added by swap
})*/
}

const deleteOrCancelCheckupHandler = (e) =>{
    let checkup_name = props.location.state.checkup_name
    let testName = props.location.state.testName
    let checkup_id = props.location.state.checkup_id
    if(checkup_name != undefined && testName != undefined){
     // give backend call to delete checkup date

      props.history.push({
        pathname: '/test',
        state: {checkup_id,checkup_name,testName,user_id:props.location.state.user_id}
       , // added by swap
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
    console.log(date)
  let error = ''
  let value = date;

  setFormData({
    ...FormData,
    ['date']:{
      value:date,
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
    { (<form className='CreateCheckupContainer'>
     { (props.location.state.checkup_name!== '')?<label>{props.location.state.checkup_name}</label> 
     :( <Autocomplete
        {...defaultProps}
        className='Autocomplete'
        id="checkup_name"
        name='checkup_name'
        required={true}
        validate={validate}
        onChange={onChangehandler} error={FormData.checkup_name.error}
        renderInput={(params) => <TextField {...params} name='checkup_name' placeholder="Type Checkup Name" margin="normal" />}
      />) }
     {/*  <SinglSelectDropDown name='checkup_name' required={true} options={checkup_names} validate={validate}
       onChange={onChangehandler} error={FormData.checkup_name.error} placeholder={'Select at least 1 value'} >Select at least 1 value</SinglSelectDropDown>*/}
       {FormData.checkup_name.value.includes('Others') && <FormRow
          type="text"
          label="Enter Checkup Name"
          name="self_checkup_name"
          required={true}
          changeHandler={onChangehandler}
        />}
        <Grid container spacing={1} alignItems="flex-end" >
            <Grid item>
                <DateRangeIcon className='DateRangeIcon'/>
            </Grid>
          <Grid item xs={10} sm={6} md={4} lg={10}>
        <DatePicker 
        name='date'
        className='inlineDatePicker'
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
                <RoomIcon className='RoomIcon'/>
            </Grid>
          <Grid item   item xs={10} sm={6} md={4} lg={10} >
          <InputBox
          name="provider"
          className='provider'
          placeholder="Add Provider"
          required={true}
          changeHandler={onChangehandler}
        />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <AttachmentOutlinedIcon className='RoomIcon'/>
            </Grid>
          <Grid item  item xs={10} sm={6} md={4} lg={10}>
         <InputBox
          name="provider_website"
          placeholder="Add Provider Website"
          required={true}
          className='provider'
          changeHandler={onChangehandler}
        />
         </Grid>
        </Grid>
        <div style={{display:'flex',justifyContent:'center'}}>
        <Buttons onClick={(e)=>addCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DONE</Buttons>
        <Buttons onClick={(e)=>deleteOrCancelCheckupHandler(e)}  bgColor={'#F0F3F5'} buttonColor='#BC433B' >{props.location.state.testName ? 'DELETE':'CANCEL'}</Buttons>
        </div>
      </form>) }
      
    </div>
)}
export default CreateCheckupForm;