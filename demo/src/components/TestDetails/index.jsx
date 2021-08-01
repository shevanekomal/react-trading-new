import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight,faTrash} from "@fortawesome/free-solid-svg-icons";
import './TestDetails.css';

import Add_member from '../../assets/Add_member.svg'
import Frame_test from '../../assets/Frame_test.png'
import {SimpleAccordion} from '../InputFields'
 const TestDetails = (props)=> {
  const data = props.location.state
  const schedules = [{date:'3 0June 20121',dr_name:"Dr. Lal Labs"}]
  const clickHandler = ()=>{
    props.history.push({
      pathname: '/addMember',
      state: {self:false }
    })
  }
    return (
      <div className='TestDetails'>
      <div className='TestHeader'>
        <div><a><FontAwesomeIcon icon={faArrowLeft} color="#17416B" size={'lg'} /></a></div><div></div>Electro lyte<div></div><a><FontAwesomeIcon icon={faArrowRight} color="#17416B" size={'lg'} /></a></div>
        <SimpleAccordion header={'Tell me more'} details={'sample text....'}/>
        <div className='TestSubHeader'>
<div>Upcomong</div>
<table>
  <tbody>
{schedules.map(el=>(<tr><td>{el.date}</td><td>{el.dr_name}</td><td><FontAwesomeIcon icon={faTrash} color="#17416B" size={'lg'} /></td></tr>))}
  </tbody>
</table>
<img src={Add_member}  height= '40px' alt="Add_member Logo" onClick={clickHandler}/>
        </div>
        <div className='TestSubHeader'>
        <div>Past</div>
        </div>
      </div>
      )
  }
export default TestDetails