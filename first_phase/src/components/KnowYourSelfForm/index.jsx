import React,{useContext,useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import {RadioButton,DatePicker,DatePickerv1,CheckboxesGroup,Buttons,CustomTextBox} from '../InputFields'
import './KnowYourSelfForm.css'
import { FieldDataContext } from '../../context/FieldData'
import ModalWindow from '../Modal/ModalWindow'
import Loader from '../../utility/Loader'
import { useHistory } from "react-router-dom";
const KnowYourSelfForm =(props)=> {
  
  let self =  props.location.state.self
  
  const {
    StrengthingExercise,
    UpdateKnowYourselfDetails
  } = useContext(FieldDataContext)

  const history = useHistory();
  const currentPath = useLocation().pathname

  const [isLoaded,setLoader] =useState(false)
  const [isValidate,setValidate] =useState(false)
  const [state,setState] = useState({
   
    waist:{
      value:"",
      error:""
    },
   
    exercise:{
      value:"",
      error:""
    },

    sugar:{
        value:"",
        error:""
      },
     
    
})
const [state2,setState2] = useState({
  bloodTest :{
    value:"",
    error:""
  },
  vitamin :{
    value:"",
    error:""
  },
  ECG :{
    value:"",
    error:""
  },
  BP :{
    value:"",
    error:""
  },
  dentist :{
    value:"",
    error:""
  },
  covid :{
    value:"",
    error:""
  }
})
let obj = {
  gender:{
    value:'',
    error:''
  },
};

useEffect(() => {

    //below code for page reload
    window.onbeforeunload = function() {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };

},[])

useEffect(() => {
  
  let check = false
  Object.entries(state).forEach(([key, value]) =>{
    if((!!value.error || value.value=='' || (value.value && value.value.length == 0) ) && key!='waist' ){ 
     //check = (key == 'diagnosedCondition' && value.value.length == 1 && value.value[0] == 'Others') ? false : true
     console.log('in check')
      check = true;
    }
    
  })
  setValidate(check)
}, [state])

useEffect(() => {
  
  let check = false
  Object.entries(state2).forEach(([key, value]) =>{
    if((!!value.error || value.value=='' || (value.value && value.value.length == 0) ) && key!='waist' ){ 
     //check = (key == 'diagnosedCondition' && value.value.length == 1 && value.value[0] == 'Others') ? false : true
      check = true;
    }
    
  })
  setValidate(check)
}, [state2])

const [open, setOpen] = useState(false);

const handleChange =(e) =>{
  let value =  e.target.value;
  let error = ''

  setState({
  ...state,
  [e.target.name]:{
    value,
    error:error
  }
  })
}

const handleChange2 =(e) =>{
  let value =  e.target.value;
  let error = ''

  setState2({
  ...state2,
  [e.target.name]:{
    value,
    error:error
  }
  })
}

const onUpdateData = () =>{
  setLoader(true)
  let data = {}

  if(!isValidate){
    if(props.location.state.name === 'physical wellbeing'){
      data = {
        waist:state.waist.value,
        sugar:state.sugar.value,
        exercise:state.exercise.value,
        user_id:props.location.state.user_id,
        name:props.location.state.name
    }
   
  }else {
    data = {
      bloodTest:state2.bloodTest.value,
      vitamin:state2.vitamin.value,
      ECG:state2.ECG.value,
      BP:state2.BP.value,
      dentist:state2.dentist.value,
      covid:state2.covid.value,
      user_id:props.location.state.user_id,
      name:props.location.state.name
    }
  }
  UpdateKnowYourselfDetails(data).then((response)=>{
    if(response.status){
      if(props.location.state.name === 'Physical'){
        props.history.push({
          pathname: '/healthyHabitsResult',
        state: {user_id:props.location.state.user_id,name:props.location.state.name}
      })
      }else {
        props.history.push({
          pathname: '/knowYourselfResult',
        state: {user_id:props.location.state.user_id,name:props.location.state.name}
      })
      }
       
    }
    setLoader(false)
  })
  }
}
const onSkipHandler = () => {
    history.goBack()
}
const validate = (e)=>{
  
  e.target.value==='' && setState({
    ...state,
    [e.target.name]:{
      value:e.target.value,
      error:`${e.target.name} can not be empty`
    }
  })
}

    return (
      <div className='YourFormContainer'>
     {/* <Loader  text={'Generating HealthPlans...'} loaded={isLoaded}/> */}
        <p>To know your health risks, answer these questions to the best of your knowledge . If you do not know the answer to any of the questions, then you can come back later at fill this assessment.</p>
        <form name='details' style={{padding:'2%'}}>
        <div className='DetailsContainer'>
          <div className='TopicHeading'>{(props.location.state.name).toUpperCase()}</div>
          {(props.location.state.name === 'Physical Wellbeing' ||props.location.state.name === 'Physical' ) && <>
          <CustomTextBox type={'number'} defaultValue={state.waist.value} setState={setState} state={state}  placeholder={`Eg: 32 `} endAdornment="inches"  name='waist'  validate={validate}  error={state.waist.error} valueText = 'Place a tape measure just below your belly button. Breathe out naturally and take your measurement. Note that the pant or skirt waist size is often not the same as this.'>Your waist size</CustomTextBox>
          <RadioButton name={'exercise'}  required={true}  options={StrengthingExercise}  validate={validate} onChange={handleChange} defaultValue={state.exercise.value} error={state.exercise.error} valueText = 'E.g., push ups, squats or working out using equipment such as dumbbells, resistance bands, and some styles of yoga. Strengthening exercise is any activity that focuses on building muscular strength, endurance, and mass.'>How much strengthening exercise do you usually do per week?
           </RadioButton>
           <CustomTextBox type={'number'} defaultValue={state.sugar.value} setState={setState} state={state}  placeholder={`Eg: 10 `} endAdornment="teaspoons" required={true} name='sugar'  validate={validate}  error={state.sugar.error} valueText = 'This should include sugar in everything except fresh vegetables, fruits, and milk. For example, in foods like packaged drinks, sweets, chai etc.'>This should include sugar in everything except fresh vegetables, fruits, and milk. For example, in foods like packaged drinks, sweets, chai etc.</CustomTextBox>
            </>
          }
          {props.location.state.name === 'Medical Checkups' && <>
          <RadioButton name={'bloodTest'}  required={true}  options={[{text:'Within the last 1 year',value:'Within the last 1 year'},{text:'More than a year ago or Never',value:'More than a year ago or Never'}]}  validate={validate} onChange={handleChange2} defaultValue={state2.bloodTest.value} error={state2.bloodTest.error} >When did you last do routine blood tests like CBC, sugar, lipid profile etc?
           </RadioButton>
           <RadioButton name={'vitamin'}  required={true}  
           options={[{text:'Within the last 1 year',value:'Within the last 1 year'},{text:'More than a year ago or Never',value:'More than a year ago or Never'}]}  
           validate={validate} onChange={handleChange2} defaultValue={state2.vitamin.value} error={state2.vitamin.error} >When did you last do Vitamin B12 and Vitamin D blood tests?
           </RadioButton>
           <RadioButton name={'ECG'}  required={true}  options={[{text:'Got it once',value:'Got it once'},{text:'Never',value:'Never'}]} 
            validate={validate} onChange={handleChange2} defaultValue={state2.ECG.value} error={state2.ECG.error} >When did you last get an ECG or ECHO diagnostic test?
           </RadioButton>
           <RadioButton name={'BP'}  required={true}  options={[{text:'Within the last 1 year',value:'Within the last 1 year'},{text:'More than a year ago or Never',value:'More than a year ago or Never'}]}  
           validate={validate} onChange={handleChange2} defaultValue={state2.BP.value} error={state2.BP.error} >When did you last measure your blood pressure (at home or at doctors)?
           </RadioButton>
           <RadioButton name={'dentist'}  required={true}  options={[{text:'Within the last 1 year',value:'Within the last 1 year'},{text:'More than a year ago or Never',value:'More than a year ago or Never'}]}  
           validate={validate} onChange={handleChange2} defaultValue={state2.dentist.value} error={state2.dentist.error} >When did you last visit the dentist (after having symptoms or for a preventive checkup)?
           </RadioButton>
           <RadioButton name={'covid'}  required={true}  options={[{text:'Got one',value:'Got onc'},{text:'Never',value:'Never'}]}  
           validate={validate} onChange={handleChange2} defaultValue={state2.covid.value} error={state2.covid.error} >Apart from COVID19, have you discussed with your doctor about getting any other vaccine as an adult?
           </RadioButton>
             </>
           
          }
           </div>
        
        <div style={{display:'flex'}}>
       <Buttons onClick={onUpdateData}  disabled={isValidate} bgColor={!isValidate ? '#F9E24D' : '#F0F3F5 '}>Update</Buttons>
       <Buttons onClick={onSkipHandler} bgColor={'#F0F3F5'}>Skip</Buttons>
       </div>
       </form>
      </div>
    )
}
export default KnowYourSelfForm