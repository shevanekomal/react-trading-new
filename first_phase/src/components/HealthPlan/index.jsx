import './HealthPlan.css'
import {useContext,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList} from "@fortawesome/free-solid-svg-icons";
import TestPannel from '../TestPannel'
import { FieldDataContext } from '../../context/FieldData'
import Health from '../../assets/Health.svg'

const HealthPlan = (props)=> {
  const {
    getCheckupDetails,
    testsRecommanded,
    getHealthPlanDetails,
    user_id
  } = useContext(FieldDataContext)
  const clickHandler=(test,testName)=>{
    getCheckupDetails(test.checkup_id,props.location.state.user_id).then(result=>{
      props.history.push({
        pathname: '/test',
        state: { ...test,testName,user_id:props.location.state.user_id}
      })
    })
  }
  useEffect(()=>{
    if(!((props.location.state && props.location.state.user_id) || user_id)){
       props.history.push('/');
      return
    }
    getHealthPlanDetails(props.location.state.user_id)
  },[])
    return (
      <div className='HealthPlan'>
        <div className='PlanHeader'>
          <div><FontAwesomeIcon icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>{testsRecommanded.recommendedcount} Recommended checkups</div><br />
        </div>
        <div>
        Tests marked are  <img src={Health} />  highly recommended based on your health status
        </div>
        <div>
          <p>Recommended Checkups</p>
          <div>These checkups are recommended for you based on the health status information you shared. Click on each checkup to know more.</div>
        </div>
        {testsRecommanded.Recommended.map(test=> <TestPannel key = {test.testName} testName = {test.testName} test = {test} clickHandler={clickHandler} />)}
        <div className='SelfCheckup'>
        </div>
      </div>
    )
}
export default HealthPlan