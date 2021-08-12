import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight} from "@fortawesome/free-solid-svg-icons";
import './TestDetails.css';
import {useContext} from 'react'
import {SimpleAccordion} from '../InputFields'
import { FieldDataContext } from '../../context/FieldData'

 const TestDetails = (props)=> {
  const {
    getCheckupDetails,
    testsRecommanded,
    testDetails
  } = useContext(FieldDataContext)
  let checkup_id  =  props.location.state!=undefined ?  props.location.state.checkup_id : ''
  let checkup_name  =  props.location.state!=undefined ? props.location.state.checkup_name : ''
const getDetails=(direction)=>{
  let newCheckUpId = false;
  let newCheckupName = ''
  testsRecommanded.Recommended.flatMap(el=>el.testTypes.map((chkp,index)=>{
    if(chkp.checkup_id==checkup_id){
      if(direction==='prev' && index != 0){
        newCheckUpId = el.testTypes[index-1].checkup_id;
        newCheckupName = el.testTypes[index-1].checkup_name;
        console.log("prev",newCheckUpId)
        return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
      }
      if(direction==='next' && index != (el.testTypes.length-1)){
        newCheckUpId = el.testTypes[index+1].checkup_id
        newCheckupName = el.testTypes[index+1].checkup_name;
        console.log("next",newCheckUpId)
        return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
      }
      return false;
      
    }}))
    return {checkup_id:newCheckUpId,checkup_name:newCheckupName}
}
const fetchDetails=(checkupId)=>{
  getCheckupDetails(checkupId).then(result=>{
    if(result.status){
      props.history.push({
        pathname: '/test',
       // state: { ...test}
      })
    }
  })
}
    return (
      <div className='TestDetails'>
      <div className='TestHeader'>
        <div><a><FontAwesomeIcon icon={faArrowLeft} color="#17416B" size={'lg'} onClick={()=>{
          let obj = getDetails('prev') ;
          checkup_id = obj.checkup_id
          checkup_name =  obj.checkup_name
          checkup_id && fetchDetails(checkup_id)
          }}/></a></div><div></div>{checkup_name}:{checkup_id}<div></div><a><FontAwesomeIcon icon={faArrowRight} color="#17416B" size={'lg'} onClick={()=>{
          let obj = getDetails('next') ;
          checkup_id = obj.checkup_id
          checkup_name =  obj.checkup_name
          checkup_id && fetchDetails(checkup_id)
          }} /></a></div>
        <SimpleAccordion header={'Tell me more'} details={testDetails.finalResult}/>
      </div>
      )
  }
export default TestDetails