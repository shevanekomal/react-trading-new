import React,{useContext,useState} from 'react'
import {SinglSelectDropDown,RadioButton,DatePicker,CheckboxesGroup,Buttons,MultiSelectDropDown,CustomTextBox} from '../InputFields'
import './HealthStatusForm.css'
import { FieldDataContext } from '../../context/FieldData'
import ModalWindow from '../Modal/ModalWindow'
const HealthStatusForm =(props)=> {
  let self = true
  const {
    cities,
    gender,
    diet,
    exercise,
    diagnosedCondition,
    familyHistoryConditions,
    addDetails,
    disableConditions,
    alcoholIntakeOption,
    otherConditions,
    updateUserId
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
    alcoholIntake:{
      value:false,
      error:''
    },
    smoking:{
      value:'',
      error:''
    }
})
const [open, setOpen] = useState(false);
const onMulitiselcetChange = (name,item,type)=>{
  let arr = state[name].value;
  type === 'onSelect' ? arr.push(item.key) : arr=[...arr.slice(0,arr.indexOf(item.key)),...arr.slice(arr.indexOf(item.key)+1)] 
  setState({
    ...state,
    [name]:{
      value:arr,
      error:''
    }
    })
}
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
    if(e.target.value==='None'){
      setState({...state,[name]:{value:[],error:''}})
      disableConditions(name,e.target.checked)
      return
    }
    let arr = state[name].value
    !arr.includes(`${e.target.value}`)?arr.push(e.target.value):arr=[...arr.slice(0,arr.indexOf(e.target.value)),...arr.slice(arr.indexOf(e.target.value)+1)] 
      value=arr
  }
  
  if(e.target.type === 'number' && e.target.name === 'height'){
    let val = e.target.value.toString()
    value = val.substr(1,1)+"'"+val.substr(1)
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
  alcoholIntake:state.alcoholIntake.value,
  smoking:state.smoking.value,
  exercise:state.exercise.value,
  diagnosedCondition:state.diagnosedCondition.value,
  familyHistoryConditions:state.familyHistoryConditions.value,
  // name,
  // whatsAppNumber
}
  addDetails(data).then((response)=>{
      if(response.status){
        updateUserId(response.data.user_id)
        props.history.push({
          pathname: '/healthPlan',
         state: { ...FormData,self:true,user_id:response.data.user_id }
        })
      } 
      
  })
}
}
const validate =(e)=>{
  e.target.value==='' && setState({
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
        <form name='details' style={{padding:'2%'}}>
        <div className='DetailsContainer'>
          <div className='TopicHeading'>Personal Details</div>
          <SinglSelectDropDown name={'city'} required={true} options={cities} validate={validate} onChange={handleChange} error={state.city.error} >Pick your location</SinglSelectDropDown>
          <RadioButton name={'gender'} required={true}  options={gender}   validate={validate} onChange={handleChange} defaultValue={state.gender.value} error={state.gender.error}>Gender</RadioButton>
          <DatePicker name={'birthdate'}  required={true} defaultValue={state.birthdate.value}  validate={validate} onChange={handleChange} error={state.birthdate.error}>Select your birthday</DatePicker>
          <CustomTextBox type={'text'} setState={setState} state={state}  placeholder={`Eg: 5'6"`} endAdornment="ft' in''" required={true} name='height'>Your Height</CustomTextBox>
          <CustomTextBox type={'text'} setState={setState} state={state}  placeholder={`Eg: 62 `} endAdornment="kg" required={true} name='weight'>Your Weight</CustomTextBox>
        </div>
        <div className='DetailsContainer'>
          <div className='TopicHeading'>LifeStyle Details</div>
          <RadioButton name={'diet'} required={true}  options={diet}  validate={validate} onChange={handleChange} error={state.diet.error}>Select the most appropriate style of diet</RadioButton>
          <RadioButton name={'alcoholIntake'} required={true}  options={alcoholIntakeOption}  validate={validate} onChange={handleChange} error={state.alcoholIntake.error}>Update Health details page - Do you usually drink around or more than 14 units of alcohol per week?
          14 units is equivalent to around 6 bottles (650 ml) of average-strength beer or 10 small glasses of low-strength wine. A small shot of spirit (25 ml) is 1 unit each.
          </RadioButton>
          <CustomTextBox type={'number'} setState={setState} state={state} required={true} name='smoking'>How many pack-years have you smoked if you currently smoke or have quit within 15 years? If you have never smoked, then enter 0. Calculate your pack-year by multiplying the number of packs of cigarettes smoked per day by the number of years you have smoked. For example, if you have smoked a pack a day for the last 20 years, or two packs a day for the last 10 years, you have 20 pack-years.</CustomTextBox>
          <RadioButton name={'exercise'} required={true}  options={exercise}  validate={validate} onChange={handleChange} error={state.exercise.error}>How much moderate exercise do you usually do per week?
          Moderate exercise is an activitythat increases your heart-rate so at least a brisk walk.</RadioButton>
          <CheckboxesGroup name='diagnosedCondition' required={true}  options={diagnosedCondition}  validate={validate} onChange={handleChange} error={state.diagnosedCondition.error}>Select all conditions you have been diagnosed with</CheckboxesGroup>
          {state.diagnosedCondition.value.includes('Others') && <MultiSelectDropDown name='diagnosedCondition' onMulitiselcetChange={onMulitiselcetChange} options={otherConditions}/>}
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
export default HealthStatusForm