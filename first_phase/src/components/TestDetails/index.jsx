import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight,faTrash} from "@fortawesome/free-solid-svg-icons";
import './TestDetails.css';
import {useContext} from 'react'
import Add_member from '../../assets/Add_member.svg'
import {SimpleAccordion} from '../InputFields'
import { FieldDataContext } from '../../context/FieldData'


 const TestDetails = (props)=> {
   
  const {
    getCheckupDetails,
    testsRecommanded
  } = useContext(FieldDataContext)
  const {checkup_id,checkup_name} = props.location.state
  console.log(props.location.state)
  const schedules = [{date:'3 0June 20121',dr_name:"Dr. Lal Labs"}]
  const clickHandler = ()=>{
    props.history.push({
      pathname: '/addMember',
      state: {self:false }
    })
  }
const getDetails=(direction)=>{
  let newCheckUpId = false;
  testsRecommanded.testData.flatMap(el=>el.testTypes.map((chkp,index)=>{
    if(chkp.checkup_id==checkup_id){
      if(direction==='prev' && index != 0){
        newCheckUpId = el.testTypes[index-1].checkup_id;
        console.log("prev",newCheckUpId)
        return newCheckUpId
      }
      if(direction==='next' && index != (el.testTypes.length-1)){
        newCheckUpId = el.testTypes[index+1].checkup_id
        console.log("next",newCheckUpId)
        return newCheckUpId
      }
      return false;
      
    }}))
    return newCheckUpId
}
const fetchDetails=(checkupId)=>{
  getCheckupDetails({checkupId}).then(result=>{
    console.log(result)
    // props.history.push({
    //   pathname: '/test',
    //   state: { ...test}
    // })
        })
}
    return (
      <div className='TestDetails'>
      <div className='TestHeader'>
        <div><a><FontAwesomeIcon icon={faArrowLeft} color="#17416B" size={'lg'} onClick={()=>{
          let id = getDetails('prev') ;
          id && fetchDetails(id)
          }}/></a></div><div></div>{checkup_name}:{checkup_id}<div></div><a><FontAwesomeIcon icon={faArrowRight} color="#17416B" size={'lg'} onClick={()=>{
          let id = getDetails('next') ;
          id && fetchDetails(id)
          }} /></a></div>
        <SimpleAccordion header={'Tell me more'} details={'sample text....'}/>
      </div>
      )
  }
export default TestDetails