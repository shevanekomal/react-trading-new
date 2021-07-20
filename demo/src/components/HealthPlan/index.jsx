import './HealthPlan.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList,faHeart,faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import TestPannel from '../TestPannel'
const HealthPlan = ()=> {
    const testsRecommanded = [
      {
      testName:"Blood Test",
      provider:"xyz",
      testTypes:[
        {
          name:"Sugar profile",
          recommended:true
        },{
        name:'Throid profile',
        recommended:false
        }
       ]
      },
      {
        testName:"Doctor Checkups",
        provider:"xyz",
        testTypes:[
          {
            name:"Dentist",
            recommended:true
          },{
            name:'ENT',
            recommended:true
          },{
            name:'Eye/ Opthamologist',
            recommended:false
          },{
            name:'Physician',
            recommended:true
          }
         ]
        }
    ]
    return (
      <div className='HealthPlan'>
        <div className='PlanHeader'>
          <div><FontAwesomeIcon icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>
          <span>19 Recommended checkups</span><br />
          <span>0 Self-added checkups</span>
          </div>
        </div>
        <div>
        Tests marked are  <FontAwesomeIcon icon={faHeart} color="#0B7D6C" size={'1x'} />  highly recommended based on your health status
        </div>
        <div>
          <p>Recommended Checkups</p>
          <div>These checkups are recommended for you based on the health status information you shared. Click on each checkup to know more.</div>
        </div>
        {testsRecommanded.map(test=> <TestPannel key = {test.testName} test = {test}/>)}
        <div className='SelfCheckup'>
          <div>Self-Added Checkups</div>
          <button><FontAwesomeIcon icon={faPlusCircle} color="#F9E24D" size={'lg'} /></button><span>Create</span>
        </div>
      </div>
    )
}
export default HealthPlan