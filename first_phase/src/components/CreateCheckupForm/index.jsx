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
import { useHistory } from "react-router-dom";

const CreateCheckupForm = (props) =>{
 
  const {
    checkup_names,
    //createSelfAddedPlan,
    createEvent,
    deleteCheckupEventPlan
  } = useContext(FieldDataContext)
  const history = useHistory();

  const [isValidate,setValidate] = useState(false)
	
  const [FormData,setFormData] = useState({
    checkup_name:{
      value:'',
      error:''
    },
    self_checkup_name:{
      value:props?.location?.state?.checkup_name || '',
      error:''
    },
    date:{
      value:'',
      error:''
    },
    provider:{
      value:props?.location?.state?.provider || '',
      error:''
    },
    provider_website:{
      value:props?.location?.state?.provider_website || '',
      error:''
    },
  }) 
  const {self} = props.location.state
  useEffect(() => {
    let tempValidate = true 
    for (const [key, value] of Object.entries(FormData)) {
      if((!!value.error || value.value=='' || (value.value && value.value.length == 0) )&&key!='self_checkup_name' && key!='date'&& key!='provider' && key!='provider_website'){ 
        tempValidate = false;
        
       }
       if(key ==='self_checkup_name' && FormData.checkup_name.value.includes('Other') && value.value==''){
        tempValidate = false;
       }
       if(key ==='checkup_name' && value.value != 'Other' && value.value != '' ){
        tempValidate = true;
       }
       if(props.location.state.checkup_name !== '')
       tempValidate = true;
    }
    setValidate(tempValidate)
  }, [FormData])
  
  useEffect(() => {
  //  console.log(props.location.state.checkup_date)
    { (props.location.state.checkup_date != undefined && props.location.state.checkup_date  != '' )
     ?setStartDate(new Date(props.location.state.checkup_date.split('T')[0])) :setStartDate(new Date())}
    
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
  let checkup_name = '' , isOther = false;
  let isUpdate = false;
  let prevDate = '';
  if(props.location.state.checkup_name !== '') {
    checkup_name = props.location.state.checkup_name
    isUpdate = true
    prevDate = props.location.state.checkup_date;
  }
  else if(FormData.checkup_name.value.includes('Other')){
    isOther = true;
    checkup_name = FormData.self_checkup_name.value
    isUpdate = false
  }else{
    isUpdate = false
    checkup_name = FormData.checkup_name.value
  }
  
  data = {
    checkup_name:checkup_name,
   // date:FormData.date.value,
    prevDate:prevDate,
    isUpdate:isUpdate,
    isOther:isOther,
    date:startDate,
    provider:FormData.provider.value,
    provider_website:FormData.provider_website.value,
    user_id:props.location.state.user_id,
    checkup_id:props.location.state.checkup_id
}
//console.log(data)
if(props.location.state.checkup_id !== undefined && props.location.state.checkup_id !== null && props.location.state.checkup_id !== ''){
  let checkup_name = props.location.state.checkup_name
  let testName = props.location.state.testName
  let checkup_id = props.location.state.checkup_id
  createEvent(data).then((response)=>{
    if(response.status){ 
      props.history.push({
          pathname: '/test',
          state: {checkup_id,checkup_name,testName,user_id:props.location.state.user_id}, // added by swap
    })
    } else {
      props.history.push('/login')
    }
  });
  
  }else{
  createEvent(data).then((response)=>{
    if(response.status){
      let path = props.location.state.from ==='healthPlan' ? '/healthPlan' :'/calender'
     // console.log(path)
      props.history.push({
        pathname: path,
        state: {user_id:props.location.state.user_id}, // added by swap 
      })
    }else {
      props.history.push('/login')
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

    //if(checkup_name != undefined && testName != undefined){
    if(e.target.innerText === 'DELETE'){
      
      let checkup_name = props.location.state.checkup_name
      let testName = props.location.state.testName
      let checkup_id = props.location.state.checkup_id
      let data = {
        checkup_id:checkup_id,
        user_id:props.location.state.user_id,
        checkup_name:checkup_name,
        date:props.location.state.checkup_date
      }
     // console.log(data)
       // give backend call to delete checkup event
       deleteCheckupEventPlan(data).then((response)=>{
        if(response.status){
         // console.log(response)
          if(response.messages == 'Self Added Event Deleted'){
            props.history.push({
              pathname: '/healthPlan',
              state: {user_id:props.location.state.user_id}, // added by swap 
            })
          }else{
            props.history.push({
              pathname: '/test',
              state: {checkup_id,checkup_name,testName,user_id:props.location.state.user_id},
           })
          }
        
       } else {
        props.history.push('/login')
       }
      })
    }else{
      //self added from calender page
      //self added chekcup from health plan page 
     /* props.history.push({
        pathname: '/healthPlan',
        state: {user_id:props.location.state.user_id}, // added by swap 
      })*/
      history.goBack()
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
        renderInput={(params) => <TextField {...params} required={true} name='checkup_name' placeholder="Type Checkup Name" margin="normal" />}
      />) }
     {/*  <SinglSelectDropDown name='checkup_name' required={true} options={checkup_names} validate={validate}
       onChange={onChangehandler} error={FormData.checkup_name.error} placeholder={'Select at least 1 value'} >Select at least 1 value</SinglSelectDropDown>*/}
       {FormData.checkup_name.value.includes('Other') &&  <InputBox
          name="self_checkup_name"
          placeholder="Enter Checkup Name *"
          className='selfcheckup'
          changeHandler={onChangehandler}
          required={true}
          defaultValue={FormData.self_checkup_name.value}
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
          changeHandler={onChangehandler}
          defaultValue={FormData.provider.value} 
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
          className='provider'
          changeHandler={onChangehandler}
          defaultValue={FormData.provider_website.value}
        />
         </Grid>
        </Grid>
        <div style={{display:'flex',justifyContent:'center'}}>
        <Buttons onClick={(e)=>addCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DONE</Buttons>
        <Buttons onClick={(e)=>deleteOrCancelCheckupHandler(e)}  bgColor={'#F0F3F5'} buttonColor='#BC433B' >{props.location.state.checkup_name ? 'DELETE':'CANCEL'}</Buttons>
        </div>
      </form>) }
      
    </div>
)}
export default CreateCheckupForm;