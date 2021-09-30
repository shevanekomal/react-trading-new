import React,{useContext,useState, useEffect} from 'react'
import {SinglSelectDropDown,RadioButton,DatePicker,DatePickerv1,CheckboxesGroup,Buttons,MultiSelectDropDown,CustomTextBox} from '../InputFields'
import './HealthStatusForm.css'
import { FieldDataContext } from '../../context/FieldData'
import ModalWindow from '../Modal/ModalWindow'
import Loader from '../../utility/Loader'
const HealthStatusForm =(props)=> {
  
  let self =  props.location.state.self
  
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
    updateUserId,
    getHealthStatusDetails,
    userHealthDetails
  } = useContext(FieldDataContext)
  const [isLoaded,setLoader] =useState(false)
  const [isValidate,setValidate] =useState(false)
  const [state,setState] = useState({
    city:{
      value:'pune',
      error:''
      },
    gender:{
      value:'female',
      error:''
    },
    birthdate:{
      value:new Date('01/06/2000'),
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
      value:'',
      error:''
    },
    smoking:{
      value:'',
      error:''
    }
})
let obj = {
  gender:{
    value:'',
    error:''
  },
};
useEffect(() => {
  // if(['None of the below'].includes(state.diagnosedCondition.value[0])){
  //   disableConditions('diagnosedCondition',true)
  // }
  // if(['None of the below'].includes(state.familyHistoryConditions.value[0])){
  //   disableConditions('familyHistoryConditions',true)
  // }
},[state.diagnosedCondition.value,state.familyHistoryConditions.value])
useEffect(() => {
 //temp added to solve disable option issue for sub user
 disableConditions('diagnosedCondition',false);
 disableConditions('familyHistoryConditions',false)
  let userHealthDetails1 = props.location.state.userHealthDetails
  
  if(userHealthDetails1 != '' && userHealthDetails1 != undefined){
    for (const [key, value] of Object.entries(props.location.state.userHealthDetails)) {
        
      obj[key] = {
        value:value,
        error:''
      };
    }
    setSelectedDate(userHealthDetails1.dob)
    
    setState({
         ...state,
         ...obj
    })
    //console.log(state.diagnosedCondition.value)
   }else{
    //below code for page reload
    window.onbeforeunload = function() {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
   }
  
},[])

useEffect(() => {
  
  let check = false
  Object.entries(state).forEach(([key, value]) =>{
    if((!!value.error || value.value=='' || (value.value && value.value.length == 0) ) && key!='city' ){ 
     //check = (key == 'diagnosedCondition' && value.value.length == 1 && value.value[0] == 'Others') ? false : true
      check = true;
    }
    
  })
  setValidate(check)
}, [state])

const updateValues = (name,value) =>{
  let error = ''
  setState({
    ...state,
    [name]:{
      value,
      error:error
    }
  })
    console.log(state)
}
const [selectedDate, setSelectedDate] = React.useState(state.birthdate.value);
//const [selectedGender, setSelectedGender] = React.useState('female');
const handleDateChange = (date) => {
  setSelectedDate(date);

  let error = ''
  let value = date;
//  setSelectedDate(date);
let age = _calculateAge(date)
console.log(age)
if(new Date() < date){
  error = 'Please select date before today'
}else if(age<19){
  setOpen(true)
}
setState({
  ...state,
  ['birthdate']:{
    value,
    error:error
  }
  })

};

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
    if(age<19){
      setOpen(true)
      //value = '';
     // error = 'Age is below 19'
    }
  }
  if(e.target.type === 'checkbox'){
    let name = e.target.name
    if(e.target.value==='None of the below'){
      setState({...state,[name]:{value:e.target.checked?[e.target.value]:[],error:''}})
      disableConditions(name,e.target.checked)
      return
    }
    let arr = state[name].value
    console.log(arr)
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
  setLoader(true)
  let data = {}

if(!isValidate){
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
  userType:self ? 'user' : 'subUser',
  user_id:props.location.state.user_id
}
addDetails(data).then((response)=>{
  if(response.status){
   //temporary fix added by swap
  /* console.log(response.data.user_id)
    if(props.location.state.userHealthDetails != '' && props.location.state.userHealthDetails != undefined){
      props.history.push({
        pathname: '/userHome',
       state: {self:true,user_id:userHealthDetails.main_userid}
      })
    }else{*/
      self && updateUserId(response.data.user_id)
      props.history.push({
        pathname: '/userHome',
       state: {self:true,user_id:response.data.user_id}
      })
  } 
  setLoader(false)
})
}
}
const onSkipHandler = () =>{
  console.log('on skip '+props.location.state.user_id)
  props.history.push({
    pathname: '/userHome',
   state: {self:true,user_id:props.location.state.user_id}
  })
}
const validate =(e)=>{
  if(window.event.target.name === 'birthdate' && window.event.target.offsetParent.offsetParent.children.length>1 && window.event.target.offsetParent.offsetParent.children[1].innerText){
    setState({
      ...state,
      [e.target.name]:{
        error:window.event.target.offsetParent.offsetParent.children[1].innerText
      }
    })
  }
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
      <Loader  text={'Generating HealthPlans...'} loaded={isLoaded}/>
        <h2>Set up your health details. This will allow us to create a personalized health experience for you</h2>
        <p>Please note: Your information is safe with us. It will be used to personalize the healthcare information you receive. It will not be used for marketing or advertising purposes.</p>
        <form name='details' style={{padding:'2%'}}>
        <div className='DetailsContainer'>
          <div className='TopicHeading'>Personal Details</div>
          {/* <SinglSelectDropDown name={'city'} required={true} options={cities} validate={validate} onChange={handleChange} error={state.city.error} >Pick your location</SinglSelectDropDown>
           */}
          <RadioButton name={'gender'} required={true}  defaultValue={state.gender.value} options={gender}   validate={validate} onChange={handleChange}  error={state.gender.error}>Gender</RadioButton>
          <DatePickerv1 name={'birthdate'}  required={true} defaultValue={selectedDate}  validate={validate} onChange={handleDateChange} error={state.birthdate.error}>Select your birthday</DatePickerv1>          
          <CustomTextBox type={'text'} defaultValue={state.height.value} setState={setState} state={state}  placeholder={`Eg: 5'6`} endAdornment="ft' in" required={true} name='height'  validate={validate}  error={state.height.error}>Your Height</CustomTextBox>
          <CustomTextBox type={'number'} defaultValue={state.weight.value} setState={setState} state={state}  placeholder={`Eg: 62 `} endAdornment="kg" required={true} name='weight'  validate={validate}  error={state.weight.error}>Your Weight</CustomTextBox>
        </div>
        <div className='DetailsContainer'>
          <div className='TopicHeading'>LifeStyle Details</div>
          <RadioButton name={'exercise'}  required={true}  options={exercise}  validate={validate} onChange={handleChange} defaultValue={state.exercise.value} error={state.exercise.error} valueText = 'Moderate exercise is an activity that increases your heart-rate so at least a brisk walk.'>How much moderate exercise do you usually do per week?
           </RadioButton>
          <RadioButton name={'diet'}  required={true}  options={diet}  validate={validate} onChange={handleChange} defaultValue={state.diet.value} error={state.diet.error} >Select the most appropriate style of diet</RadioButton>
          <RadioButton name={'alcoholIntake'} required={true}  options={alcoholIntakeOption}  validate={validate} onChange={handleChange} defaultValue={state.alcoholIntake.value} error={state.alcoholIntake.error} valueText={'14 units is equivalent to around 6 bottles (650 ml) of average-strength beer or 10 small glasses of low-strength wine. A small shot of spirit (25 ml) is 1 unit each.'}>Do you usually drink around or more than 14 units of alcohol per week?
          
          </RadioButton>
          <CustomTextBox type={'number'} defaultValue={state.smoking.value} setState={setState} state={state} required={true} name='smoking' validate={validate} error={state.smoking.error} valueText='If you have never smoked, then enter 0. Calculate your pack-year by multiplying the number of packs of cigarettes smoked per day by the number of years you have smoked. For example, if you have smoked a pack a day for the last 20 years, or two packs a day for the last 10 years, you have 20 pack-years.'>How many pack-years have you smoked if you currently smoke or have quit within 15 years? </CustomTextBox>
          <CheckboxesGroup name='diagnosedCondition' required={true}  defaultValue={state.diagnosedCondition.value} options={diagnosedCondition}  validate={validate} onChange={handleChange} error={state.diagnosedCondition.error} label={'Select all conditions you have been diagnosed with'} />
          { state.diagnosedCondition.value.includes('Others') && <MultiSelectDropDown name='diagnosedCondition' onMulitiselcetChange={onMulitiselcetChange} options={otherConditions} placeholder={'Select at least 1 value '} required={true} validate={validate}/>}
          <CheckboxesGroup name='familyHistoryConditions' defaultValue={state.familyHistoryConditions.value} required={true} options={familyHistoryConditions}  validate={validate} onChange={handleChange} error={state.familyHistoryConditions.error} label={'Select all conditions for which you have a family history'} >
          <br/> Family history means at least one diagnosed case in your 1st degree relatives (parents or siblings or children). Or more than one diagnosed cases in your 2nd degree relatives (grandparents,aunts, uncles, cousins).</CheckboxesGroup>
           { open && 
          <ModalWindow open={open}  handleOpen={()=>setOpen(true)} handleClose ={()=>setOpen(false)} option1 = 'OKAY' option1bgColor='#F9E24D' option2 = ''><p>We are currently working with our expert doctors to create the medically best health plans for our younger members under the age of 18. </p>
          <p>Please do continue to create the profile where you will still be able to use all the other features. We will inform you as soon as we have the health plan ready!</p></ModalWindow>}
        </div>
        <div style={{display:'flex'}}>
       <Buttons onClick={onUpdateData}  disabled={isValidate} bgColor={!isValidate ? '#F9E24D' : '#F0F3F5 '}>Update</Buttons>
       {!self && <Buttons onClick={onSkipHandler} bgColor={'#F0F3F5'}>Skip For Now</Buttons>}
       </div>
       </form>
      </div>
    )
}
export default HealthStatusForm