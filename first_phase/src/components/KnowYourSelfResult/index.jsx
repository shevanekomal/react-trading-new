import './KnowYourSelfResult.css'
import {useContext,useEffect,useState} from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {Buttons} from '../InputFields'


import { FieldDataContext } from '../../context/FieldData'
import warning from '../../assets/warning.svg';
import ok from '../../assets/okCircle.svg';
import {useWindowSize} from '../../utility'

const KnowYourselfResult = (props)=> {
  const [width, height] = useWindowSize();
  
  let self = false;
  const {
    knowYourSelfResult,
   getKnowYourSelfResult,
    user_id
  } = useContext(FieldDataContext)
  
  useEffect(()=>{
   
    getKnowYourSelfResult(props.location.state.user_id,props.location.state.name).then(result=>{
        console.log(knowYourSelfResult)
    /*  if(!result){   
        props.history.push({
          pathname: '/login'
        })
      }*/
    });
    
  },[])

  const ClickHandler = () => {
    props.history.push({
        pathname: '/knowYourself',
        state: {user_id:props.location.state.user_id,name:props.location.state.name},
      })
  }
  const recommClickHandler = (e) => {
    
    if(e.target.innerText ==='CLICK TO SEE RECOMMENDATIONS'){
      props.history.push({
        pathname: '/healthyHabitsResult',
        state: {user_id:props.location.state.user_id,name:'Physical'}
      })
    }else {
      props.history.push({
        pathname: '/pdf',
        state: {user_id:props.location.state.user_id,pdfName:'medicalPDF'}
      })
    }
    
  }

    return (
      <div className='ResultContainer'>
          <div className='TopicHeading'>{(props.location.state.name).toUpperCase()}</div>
          <p>{props.location.state.name === 'Physical Wellbeing' ?('Here is your assessment based on your lifestyle status. You can act to manage your risks by clicking on the recommendations below.')
             :('Here is your assessment based on your checkup status. Act & learn more by clicking on the recommendations below.')}</p>
          {props.location.state.name === 'Physical Wellbeing' && <> <div className='DetailsContainer'>
          {knowYourSelfResult.BMI !== undefined && <>
            <div className='SubHeading'>{knowYourSelfResult.BMI.length > 0 && knowYourSelfResult.BMI.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}{knowYourSelfResult.BMI.map(res => res.text)}</div>
            <label>BMI is a convenient guide to know if you are around your healthy weight based only on your height. We follow the recommended BMI guidelines of the World Health Organisation (WHO) 
                which categorises the risk of chronic health conditions for Asian populations (including Indians) as:</label>
            <label>Less than 18.5 kg/m²: underweight</label>
            <label>Between 18.5–23 : acceptable risk</label>
            <label>Between 23–27.5 : increased risk</label>
            <label>More than 27.5 : high risk</label> </>}
            {knowYourSelfResult.waist !== undefined && <>
            {knowYourSelfResult.waist.length > 0 ?  <div className='SubHeading'>{knowYourSelfResult.waist.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.waist.length > 0 && knowYourSelfResult.waist.map(res => res.text)}</div>
            :(<div className='SubHeading'>Please measure and enter your waist size to know your risk.</div>)}
            <label>Waist size is considered as important as BMI as it checks if you are carrying fat around your abdomen. We follow the recommended waist size guidelines of the International Diabetes Federation which categorises: Healthy waist size for men is less than 35.5 (or 90 cm) inches and for women is less than 31.5 inches (or 80 cm).</label>
            </>}
        </div>
        <div className='DetailsContainer'>
        {knowYourSelfResult.excercise !== undefined && <>
            <div className='SubHeading'>{knowYourSelfResult.excercise.length > 0 && knowYourSelfResult.excercise.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.excercise.length > 0 &&knowYourSelfResult.excercise.map(res => res.text)}</div>
            <label>{knowYourSelfResult.excercise.length > 0 && knowYourSelfResult.excercise.map(res => res.text2)}</label>
            </>}
            {knowYourSelfResult.strengthingExcercise !== undefined && <>
             <div className='SubHeading'>{knowYourSelfResult.strengthingExcercise.length > 0 && knowYourSelfResult.strengthingExcercise.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.strengthingExcercise.length > 0 && knowYourSelfResult.strengthingExcercise.map(res => res.text)}</div>
            <label>{knowYourSelfResult.strengthingExcercise.length > 0 && knowYourSelfResult.strengthingExcercise.map(res => res.text2)}</label>
            </>}
        </div>
        <div className='DetailsContainer'>
        {knowYourSelfResult.sugar !== undefined && <>
            <div className='SubHeading'>{knowYourSelfResult.sugar.length > 0 && knowYourSelfResult.sugar.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.sugar.length > 0 && knowYourSelfResult.sugar.map(res => res.text)}</div>
            <label>{knowYourSelfResult.sugar.length > 0 && knowYourSelfResult.sugar.map(res => res.text2)}</label>
            </>}
            {knowYourSelfResult.diet !== undefined && <>
            {knowYourSelfResult.diet.length > 0 && <><div className='SubHeading'>{knowYourSelfResult.diet.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.diet.length > 0 && knowYourSelfResult.diet.map(res => res.text)}</div>
            <label>{knowYourSelfResult.diet.length > 0 && knowYourSelfResult.diet.map(res => res.text2)}</label></>}
            </>}
            {knowYourSelfResult.alcohol !== undefined && <>
            <div className='SubHeading'>{knowYourSelfResult.alcohol.length > 0 && knowYourSelfResult.alcohol.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.alcohol.length > 0 && knowYourSelfResult.alcohol.map(res => res.text)}</div>
            <label>{knowYourSelfResult.alcohol.length > 0 && knowYourSelfResult.alcohol.map(res => res.text2)}</label>
            </>}
            {knowYourSelfResult.smoke !== undefined && <>
             <div className='SubHeading'>{knowYourSelfResult.smoke.length > 0 &&  knowYourSelfResult.smoke.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.smoke.length > 0 && knowYourSelfResult.smoke.map(res => res.text)}</div>
            <label>{knowYourSelfResult.smoke.length > 0 && knowYourSelfResult.smoke.map(res => res.text2)}</label>
            </>}
        </div>
      </>  }
      {props.location.state.name === 'Medical Checkups' && knowYourSelfResult.medicalCheckups !== undefined && <> <div className='DetailsContainer'>
      <div className='SubHeading'>{knowYourSelfResult.medicalCheckups.map(res => res.risk===0 ?<img className='checkCircle' src={ok} /> :<img className='checkCircle' src={warning} />)}
            {knowYourSelfResult.medicalCheckups.map(res => res.text)}</div>
            <label>{knowYourSelfResult.medicalCheckups.map(res => res.text2)}</label>
      </div>
      </>
      }
        <div >
       <Buttons  onClick={(e)=>recommClickHandler(e)} bgColor={'#F9E24D'}>{props.location.state.name ==='Physical Wellbeing'?'Click to see recommendations' :'Click to know more about medical checkups'}</Buttons>
       <Buttons onClick={ClickHandler} bgColor={'#F0F3F5'}>Retake assessment</Buttons>
       </div>
      </div>
    )
}

export default KnowYourselfResult