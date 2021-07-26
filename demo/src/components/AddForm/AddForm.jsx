import React,{useContext,useState,useRef} from 'react'
import {SinglSelectDropDown,RadioButton,DatePicker,Textbox,CheckboxesGroup,Buttons} from '../InputFields'
import './AddForm.css'
import { FieldDataContext } from '../../context/FieldData'
import ModalWindow from '../../components/Modal/ModalWindow'

const AddForm =(props)=> {
  const {name,whatsAppNumber,self} = props.location.state
const {
  cities,
  gender,
  diet,
  exercise,
  conditions,
  familyHistoryConditions,
  addDetails
} = useContext(FieldDataContext)
const [state,setState] = useState({
  city:{
    value:'pune',
     error:''
    },
  gender:{
    value:'male',
    error:''
  },
  birthdate:{
    value:"",
    error:""
  },
  height:{
    value:"",
    error:""
  },
  weight:{
    value:"",
    error:""
  },
  diet:{
    value:"",
    error:""
  },
  exercise:{
    value:"",
    error:""
  },
  diagnosedCondition:{
    value:[],
    error:""
  },
  familyHistoryConditions:{
    value:[],
    error:""
  },
})
const [open, setOpen] = useState(false);
console.log(props.location.state,"l")
const handleChange =(e) =>{
  let value =  e.target.value;
  let error = ''
  if(e.target.type==='date' && e.target.value){
    let age = _calculateAge(e.target.value)
    if(age<18){
      setOpen(true)
      value = '';
      error = 'Age is below 18'
    }
  }
  if(e.target.type === 'checkbox'){
    let name = e.target.name
    let arr = state[name].value
  !arr.includes(`${e.target.value}`)?arr.push(e.target.value):arr=[...arr.slice(0,arr.indexOf(e.target.value)),...arr.slice(arr.indexOf(e.target.value)+1)] 
    value=arr
  }
  setState({
  ...state,
  [e.target.name]:{
    value,
    error:error
  }
  })
}
const _calculateAge=(birthday) =>{ 
  const diffTime = Math.abs( new Date() - new Date(birthday));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return Math.floor(diffDays/365)
}
const onUpdateData = () =>{
  let validate = true;
  let data = {}
  
Object.entries(state).forEach(([key, value]) =>{
  if(!!+value.error){
    validate = false
    // setState({
    //   ...state,
    //   key:{
    //     value:value.value,
    //     error:`${key} is required`
    //   }
    // })
  }
})
if(validate){
  data = {
  city:state.city.value,
  gender:state.gender.value,
  birthdate:state.birthdate.value,
  height:state.height.value,
  weight:state.weight.value,
  diet:state.diet.value,
  exercise:state.city.value,
  diagnosedCondition:state.diagnosedCondition.value,
  familyHistoryConditions:state.familyHistoryConditions.value,
  name,
  whatsAppNumber
}
  addDetails(data).then((response)=>{
    console.log(response)
  })
  props.history.push({
    pathname: '/userHome',
   //state: { ...FormData,self:true }
  })
}
}
const validate =(e)=>{
  if(e.target.value==='')
  setState({
    ...state,
    [e.target.name]:{
      value:e.target.value,
      error:`${e.target.name} can not be empty`
    }
    })
}
    return (
      <div className='FormContainer'>
        <h2>Set up your health details. This will allow us to create a personalized health experience for you</h2>
        <p>Please note: Your information is safe with us. It will be used to personalize the healthcare information you receive. It will not be used for marketing or advertising purposes.</p>
        <form name='details'>
        <div className='DetailsContainer'>
          <div className='TopicHeading'>Personal Details</div>
          <SinglSelectDropDown name={'city'} required={true} options={cities} validate={validate} onChange={handleChange} error={state.city.error} >Pick your location</SinglSelectDropDown>
          <RadioButton name={'gender'} required={true}  options={gender}   validate={validate} onChange={handleChange} defaultValue={state.gender.value} error={state.gender.error}>Gender</RadioButton>
          <DatePicker name={'birthdate'}  required={true} defaultValue={state.birthdate.value}  validate={validate} onChange={handleChange} error={state.birthdate.error}>Select your birthday</DatePicker>
          <Textbox type={'number'} endAdornment="ft' in''" required={true} name='height' textRef={useRef('0')}  validate={validate} onChange={handleChange} error={state.height.error} value={state.height}>Your height</Textbox>
          <Textbox type={'number'} endAdornment='kg' required={true}  name='weight'  textRef={useRef('0')}  validate={validate} onChange={handleChange} error={state.weight.error} value={state.weight}>Your Weight</Textbox>
          </div>
          <div className='DetailsContainer'>
          <div className='TopicHeading'>LifeStyle Details</div>
          <RadioButton name={'diet'} required={true}  options={diet}  validate={validate} onChange={handleChange} error={state.diet.error}>Select the most appropriate style of diet</RadioButton>
          <RadioButton name={'exercise'} required={true}  options={exercise}  validate={validate} onChange={handleChange} error={state.exercise.error}>How much moderate exercise do you usually do per week?
          Moderate exercise is an activitythat increases your heart-rate so at least a brisk walk.</RadioButton>
          <CheckboxesGroup name='diagnosedCondition' required={true}  options={conditions}  validate={validate} onChange={handleChange} error={state.diagnosedCondition.error}>Select all conditions you have been diagnosed with</CheckboxesGroup>
          <CheckboxesGroup name='familyHistoryConditions' required={true} options={familyHistoryConditions}  validate={validate} onChange={handleChange} error={state.familyHistoryConditions.error}>Select all conditions for which you have a family history
          Family history means at least one diagnosed case in your 1st degree relatives (parents or siblings or children). Or more than one diagnosed cases in your 2nd degree relatives (aunts, uncles, cousins).</CheckboxesGroup>
          { open && 
        <ModalWindow open={open} handleOpen={()=>setOpen(true)} handleClose ={()=>setOpen(false)}><p>We are currently working with our expert doctors to create the medically best health plans for our younger members under the age of 18. </p>
        <p>Please do continue to create the profile where you will still be able to use all the other features. We will inform you as soon as we have the health plan ready!</p></ModalWindow>}
        </div>
       {!self && <Buttons >Skip For Now</Buttons>}
       <Buttons onClick={onUpdateData} bgColor={'#F9E24D'}>Update</Buttons>
        </form>
      </div>
    )
}
export default AddForm