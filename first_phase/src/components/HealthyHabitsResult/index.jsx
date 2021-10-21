import './HealthyHabitsResult.css'
import {useContext,useEffect,useState} from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {Buttons} from '../InputFields'
import { FieldDataContext } from '../../context/FieldData'
import beer from '../../assets/Beer bottles.svg';
import Broccoli from '../../assets/Broccoli.svg';
import Desserts from '../../assets/Desserts.svg';
import smoke_free from '../../assets/smoke_free.svg';
import Up_Arrow from '../../assets/Up Arrow.svg';
import salt from '../../assets/salt.svg';
import Running from '../../assets/Running.svg';
import fried_chicken from '../../assets/fried chicken.svg';
import Morning_exercise from '../../assets/Morning exercise.svg';
import movement from '../../assets/movement.svg';
import sports from '../../assets/sports.svg';
import {useWindowSize} from '../../utility'

const HealthyHabitsResult = (props)=> {
  //const [width, height] = useWindowSize();
  
  //let self = false;
  const {
    knowYourSelfResult,
    getKnowYourSelfResult,
    user_id
  } = useContext(FieldDataContext)
  
  useEffect(()=>{
    getKnowYourSelfResult(props.location.state.user_id,props.location.state.name).then(result=>{
       // console.log(knowYourSelfResult)
    /*  if(!result){   
        props.history.push({
          pathname: '/login'
        })
      }*/
    });
    
  },[])

  const ClickHandler = () => {
    props.history.push({
      pathname: '/pdf',
      state: {user_id:props.location.state.user_id,pdfName:'physicalPDF'}
    })
  }

    return (
      <div className='ResultContainer'>
          <div className='TopicHeading'>{(props.location.state.name).toUpperCase()}</div>
          <p>Physical healthy habits are not just about loosing weight but about being physically fit. The right nutrition plan is key when you want to lose weight, but exercise is essential to maintain your weight and overall health. So both balanced exercise and nutrition is essential.</p>
          <div className='DetailsContainer'>
            
            {knowYourSelfResult.excercise !== undefined && <><div className='SubHeading'><img className='checkCircle' src={Running} />Aerobic exercise</div>
            <label>{knowYourSelfResult.excercise.map(res => res.text)}</label><br/>
            <p>The right exercise for you depends on your age, body type, and existing medical conditions. Some examples of aerobic exercise are - brisk walking, running, swimming, cycling, sports, cardio training etc.</p>
             </>}   

            {knowYourSelfResult.strengthingExcercise !== undefined && <><div className='SubHeading'><img className='checkCircle' src={sports} />Strengthening exercise</div>
            <label>{knowYourSelfResult.strengthingExcercise.map(res => res.text)}</label><br/>
            <p>Some examples of strengthening exercise are - push ups, squats or working out using equipment such as dumbbells, resistance bands, and some styles of yoga.</p>
            </>}
            {knowYourSelfResult.age !== undefined && knowYourSelfResult.age.length > 0 && <> <div className='SubHeading'><img className='checkCircle' src={Morning_exercise} />Balance training</div>
            <label>{knowYourSelfResult.age.map(res => res.text)}</label> </>}

            <div className='SubHeading'><img className='checkCircle' src={movement} />Movement</div>
            <label>You must have heard that it is recommended to walk around 10,000 steps per day. A quick way to check you do that is to just make sure you walk around 1 hour and 30 minutes as a part of your daily life like going to the shops, inside the house etc. </label>
           
            <div className='SubHeading'><img className='checkCircle' src={Up_Arrow} />Stand up</div>
            <label>In your working hours, stand up after every 1 hour for bit of a walk around. Your bones will thank you forever!</label>

        </div>
        <div className='DetailsContainer'>
            
            {knowYourSelfResult.sugar !== undefined && knowYourSelfResult.sugar.length > 0 && <> <div className='SubHeading'><img className='checkCircle' src={Desserts} />Sugar</div>
            <label>{knowYourSelfResult.sugar.map(res => res.text)}</label><br/>
            <p>Sugar is tasty but sadly there is no nutritional benefit from added sugar and it is linked to higher risk of chronic conditions. So use your recommended sugar intake wisely. Use fruits and nuts to sweeten things instead of added sugar. Enjoy the occasional sweet or cake, but save your sugar spoons by avoiding soft drinks and packages foods.</p>
            </>}
            <div className='SubHeading'><img className='checkCircle' src={salt} />Salt</div>
            <label>We are so used to the taste of salt but high intake of salt leads to increased heart disease risk. The World Health Organisation (WHO) recommends that adults consume less than 5 g (just under a teaspoon) of salt per day. Avoiding processed foods and a lot of salty snacks helps manage your salt intake.</label>
            
            {knowYourSelfResult.bmi !== undefined && knowYourSelfResult.bmi.length > 0 && <> <div className='SubHeading'><img className='checkCircle' src={fried_chicken} />Proteins</div>
            <label>{knowYourSelfResult.bmi.map(res => res.text)}</label><br/>
            <p>Some protein-rich foods you can include in your diet apart from fish and meat: besan chila, dalia, poha, sprouts salad, paneer, egg</p>
            </>}

            {knowYourSelfResult.veg !== undefined && knowYourSelfResult.veg.length > 0 && <> <div className='SubHeading'><img className='checkCircle' src={Broccoli} />Vitamin B12</div>
            <label>{knowYourSelfResult.veg.map(res => res.text)}</label>
            </>}

            {knowYourSelfResult.alcohol !== undefined && knowYourSelfResult.alcohol.length > 0 && <> <div className='SubHeading'><img className='checkCircle' src={beer} />Alcohol</div>
            <label>{knowYourSelfResult.alcohol.map(res => res.text)}</label>
            </>}
            {knowYourSelfResult.smoke !== undefined && knowYourSelfResult.smoke.length > 0 && <> <div className='SubHeading'><img className='checkCircle' src={smoke_free} />Tobacco</div>
            <label>{knowYourSelfResult.smoke.map(res => res.text)}</label>
            </>}

        </div>
       
        <div >
       <Buttons  onClick = {ClickHandler} bgColor={'#F9E24D'}>Click to know more about physical wellbeing</Buttons>
      
    </div>
      </div>
    )
}

export default HealthyHabitsResult