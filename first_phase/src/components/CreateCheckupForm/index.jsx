import {InputBox,Buttons,DatePickerv1} from '../InputFields'
import React,{useState,useEffect,useContext} from 'react'
import { FieldDataContext } from '../../context/FieldData'
import Grid from '@material-ui/core/Grid';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CreateCheckupForm = (props) =>{

  const [isValidate,setValidate] = useState(false)
  const {
    createCheckup
  } = useContext(FieldDataContext)
  const [FormData,setFormData] = useState({
    name:{
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
    name:FormData.name.value,
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
  return(
    <div>
    { (<form >
        
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
        <Buttons onClick={(e)=>addCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DONE</Buttons>
        <Buttons onClick={(e)=>deleteCheckupHandler(e)} disabled={!isValidate} bgColor={isValidate ? '#F9E24D' : '#F0F3F5 '}>DELETE</Buttons>
      </form>) }
    </div>
)}
export default CreateCheckupForm;