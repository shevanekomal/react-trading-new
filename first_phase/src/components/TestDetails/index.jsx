import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight} from "@fortawesome/free-solid-svg-icons";
import './TestDetails.css';
import {useContext, useEffect} from 'react'
import {SimpleAccordion} from '../InputFields'
import { FieldDataContext } from '../../context/FieldData'

  const TestDetails = (props)=> {
  const {
    getCheckupDetails,
    testsRecommanded,
    testDetails,
    user_id
  } = useContext(FieldDataContext)
  useEffect(()=>{
    !props.location.state && props.history.push("/")
  },[])
  let checkup_id = props.location.state!=undefined ?  props.location.state.checkup_id : ''
  let checkup_name = props.location.state!=undefined ? props.location.state.checkup_name : ''

  let testName = props.location.state!=undefined ?  props.location.state.testName : ''

  const getDetails=(direction)=>{
    let newCheckUpId = checkup_id;
    let newCheckupName = checkup_name
    testsRecommanded.Recommended.flatMap(el=>el.testTypes.map((chkp,index)=>{
      if(chkp.checkup_id==checkup_id){
        let item; 
        if(direction==='prev' ){
        if(index != 0)
          item = el.testTypes[index-1]
        else{
        testsRecommanded.Recommended.find((x,i)=>{
          if(x.testName == testName && i !=0 ){
            item = testsRecommanded.Recommended[i-1].testTypes[testsRecommanded.Recommended[i-1].testTypes.length-1]
            testName = testsRecommanded.Recommended[i-1].testName
            return {checkup_id:item.checkup_id,checkup_name:item.checkup_name}

          }
        }
        }
        if(direction==='next'){
          if(index != (el.testTypes.length-1))
             item = el.testTypes[index+1]
          else{
          testsRecommanded.Recommended.find((x,i)=>{
             if(x.testName == testName && i != (testsRecommanded.Recommended.length-1)){
               item = testsRecommanded.Recommended[i+1].testTypes[0]
               testName = testsRecommanded.Recommended[i+1].testName
               return {checkup_id:item.checkup_id,checkup_name:item.checkup_name}
            }
          })
          }
            
        }
        newCheckUpId = item ? item.checkup_id : checkup_id ;
        newCheckupName = item ? item.checkup_name : checkup_name;
        return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
      }}))
      return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
}

const fetchDetails=(checkupId)=>{
  getCheckupDetails(checkupId).then(result=>{
    if(result.status){
      props.history.push({
        pathname: '/test',
        state: {checkup_id, checkup_name,testName}
      })
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
  return (
    <div className='TestDetails'>
    <div className='TestHeader'>
    <div><a><FontAwesomeIcon icon={faArrowLeft} color="#17416B" size={'lg'} onClick={()=>navigationHandler('prev')}/></a></div><div></div>{checkup_name}<div></div><a><FontAwesomeIcon icon={faArrowRight} color="#17416B" size={'lg'} onClick={()=>navigationHandler('next')} /></a></div>
      <SimpleAccordion header={'Tell me more'} recommended_details={testDetails.recomm_level} whyrecommended_details={testDetails.why_recommended} frequency = {testDetails.frequency} finalResult={testDetails.finalResult}/>
       <button className='BackButton' onClick={()=>{props.history.push({pathname:'/healthPlan',state:{user_id}})}}>Back</button>
    </div>
    )
  }
export default TestDetails