import './HealthPlan.css'
import {useContext,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList,faHeart,faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import TestPannel from '../TestPannel'
import { FieldDataContext } from '../../context/FieldData'

const HealthPlan = (props)=> {
  const {
    getCheckupDetails,
    testsRecommanded,
    getHealthPlanDetails
  } = useContext(FieldDataContext)

  const clickHandler=(test)=>{
    getCheckupDetails({checkupId:test.checkup_id}).then(result=>{
      props.history.push({
        pathname: '/test',
        state: { ...test}
      })
    })
  }
  useEffect(()=>{
    getHealthPlanDetails()
  },[])
    return (
      <div className='HealthPlan'>
        <div className='PlanHeader'>
          <div><FontAwesomeIcon icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>
          <span>19 Recommended checkups</span><br />
          </div>
        </div>
        <div>
        Tests marked are  <FontAwesomeIcon icon={faHeart} color="#0B7D6C" size={'1x'} />  highly recommended based on your health status
        </div>
        <div>
          <p>Recommended Checkups</p>
          <div>These checkups are recommended for you based on the health status information you shared. Click on each checkup to know more.</div>
        </div>
        {testsRecommanded.Recommended.map(test=> <TestPannel key = {test.testName} test = {test} clickHandler={clickHandler} />)}
        <div className='SelfCheckup'>
        </div>
      </div>
    )
}
export default HealthPlan