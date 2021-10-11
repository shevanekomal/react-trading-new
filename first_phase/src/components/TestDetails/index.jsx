import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight,faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import './TestDetails.css';
import {useContext, useEffect} from 'react'
import {SimpleAccordion} from '../InputFields'
import { FieldDataContext } from '../../context/FieldData'
import Add_test from '../../assets/Add_test.svg';
import Jeeva from '../../assets/Jeeva-upright-circles.svg';

  const TestDetails = (props)=> {
    let key = 0;
  const {
    getCheckupDetails,
    testsRecommanded,
    testDetails,
    user_id
  } = useContext(FieldDataContext)
  useEffect(()=>{
  
 !((props.location.state && props.location.state.user_id) || user_id) && props.history.push("/")
   //added below lines of code for refresh and commented above line by swap
  // console.log(props.location.state)
   getCheckupDetails(props.location.state.checkup_id,props.location.state.user_id).then(result=>{
    if(result.status){
      //console.log(result.data)
      props.history.push({
        pathname: '/test',
        state: {checkup_id, checkup_name,testName,user_id:props.location.state.user_id}
      })
    }else {
      props.history.push('/login')
    }
  })
  //sendDataToParent('aa')
  window.localStorage.setItem('subuser_id',props.location.state.user_id)
  
  },[])
  let checkup_id =  props.location != undefined && props.location.state!=undefined ?  props.location.state.checkup_id : ''
  let checkup_name =  props.location != undefined && props.location.state!=undefined ? props.location.state.checkup_name : ''

  let testName =  props.location != undefined && props.location.state!=undefined ?  props.location.state.testName : ''

  const getDetails=(direction)=>{
    let newCheckUpId = checkup_id;
    let newCheckupName = checkup_name
    testsRecommanded.Recommended.flatMap(el=>el.testTypes.map((chkp,index)=>{
      if(chkp.checkup_id==checkup_id){
        testName = el.testName
        let item; 
        if(direction==='prev' ){
          if(index != 0){
            item = el.testTypes[index-1]
          }else{
            testsRecommanded.Recommended.find((x,i)=>{
              if(x.testName === testName && i !=0 ){
                item = testsRecommanded.Recommended[i-1].testTypes[testsRecommanded.Recommended[i-1].testTypes.length-1]
                return {checkup_id:item.checkup_id,checkup_name:item.checkup_name}
              }
              })
          }
        }
        if(direction==='next'){
          if(index != (el.testTypes.length-1)){
            item = el.testTypes[index+1]
          }else{
            testsRecommanded.Recommended.find((x,i)=>{
             if(x.testName === testName && i != (testsRecommanded.Recommended.length-1)){
               item = testsRecommanded.Recommended[i+1].testTypes[0]
               return {checkup_id:item.checkup_id,checkup_name:item.checkup_name}
            }
          })
          }
        }
        newCheckUpId = item ? item.checkup_id : checkup_id ;
        newCheckupName = item ? item.checkup_name : checkup_name;
      }
        return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
      }))
      return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
}

const fetchDetails=(checkupId)=>{
  getCheckupDetails(checkupId,props.location.state.user_id).then(result=>{
    if(result.status){
     // console.log(result.data)
      props.history.push({
        pathname: '/test',
        state: {checkup_id, checkup_name,testName,user_id:props.location.state.user_id}
      })
    }else {
      props.history.push('/login')
    }
  })
}

const navigationHandler =(type)=>{
  let obj = getDetails(type) ;
  if(checkup_id !== obj.checkup_id){
      checkup_id = obj.checkup_id
      checkup_name =  obj.checkup_name
      checkup_id && fetchDetails(checkup_id)
    }
}

const createCheckupHandler = () =>{
  props.history.push({
    pathname: '/createCheckup',
    state: {checkup_id,checkup_name,testName,user_id:props.location.state.user_id}
  })
}
 const eventDetailsClickHandler=(key,date,provider,provider_website)=>{
  // console.log(date)
   //console.log(key)
  }
  return (
    <div className='TestDetails'>
    <div className='TestHeader'>
    <div><a><FontAwesomeIcon icon={faArrowLeft} color="#17416B" size={'lg'} onClick={()=>navigationHandler('prev')}/></a></div><div></div><b>{checkup_name}</b><div></div><a><FontAwesomeIcon icon={faArrowRight} color="#17416B" size={'lg'} onClick={()=>navigationHandler('next')} /></a></div>
      <SimpleAccordion header={'Click here to know more'} recommended_details={testDetails.recomm_level} whyrecommended_details={testDetails.why_recommended} frequency = {testDetails.frequency} conditions={testDetails.conditions} test_details={testDetails.test_details} other_info={testDetails.other_info} checkup_category={testDetails.checkup_category}/>
       {/* <button className='BackButton' onClick={()=>{props.history.push({pathname:'/healthPlan',state:{user_id}})}}>Back</button> */}
    <div>
    <div className='TestDetailsContainer'>
    <label>Upcoming Checkups</label>
    <table className='dateDetails'>
      <tbody>
    
      { (testDetails.upcomingEvents.map(event=><tr key={event.key} onClick={eventDetailsClickHandler(event.key,event.date,event.provider,event.provider_website)}> <td><span>{event.date}</span></td>
                <td>{event.provider}</td>
                  </tr> )
        )
      }
      </tbody>       
    </table>
    <span style={{cursor: 'pointer'}}><img className='add_test' src={Add_test} onClick={createCheckupHandler} />
      {' '}Create</span><br /><br />
    <label>Past Checkups</label>
    <table className='dateDetails'>
      <tbody>
    
      { (testDetails.pastEvents.map(event=><tr key={event.key} onClick={eventDetailsClickHandler(event.key,event.date,event.provider,event.provider_website)}> <td><span>{event.date}</span></td>
                <td>{event.provider}</td>
                  </tr> )
        )
      }
      
      </tbody>       
    </table>
    </div>
    <div  style={{display:'flex',justifyContent:'center'}}>
    <img src={Jeeva} />
    </div>
    
    <div>
    
    </div>
   
    </div>
    </div>

    )
  }
export default TestDetails