import './MyProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Man from '../../assets/profile/Man.svg'
import Woman from '../../assets/profile/Woman.svg'
import OldMan from '../../assets/profile/Old-man.svg'
import OldWoman from '../../assets/profile/Old-woman.svg'
import Girl from '../../assets/profile/Girl.svg'
import Boy from '../../assets/profile/Boy.svg'
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const MyProfile =(props)=> {
  const healthStatusClickHandler = (user_id) =>{
    props.history.push({
      pathname: '/healthPlan',
      state: {user_id:user_id}, // added by swap 
    })
   }

   const viewPDF = () => {
    props.history.push({
      pathname: '/pdf'
    })
  }

  
    return (
      <div>
        <div class="iconDiv">
        <div><img src={Man}></img> <label>Manan</label><SettingsIcon /></div>
        </div>
        <div class="calender">
        <label><b>{new Date().toLocaleString('en-us',{day:'numeric'}) +' '+ new Date().toLocaleString('en-us',{month:'long', year:'numeric'}) }</b></label>
        <br/><span>Open Calender</span><FontAwesomeIcon  name='Health Status' icon={faAngleRight} color="#17416B" size={'lg'} />
        </div>
        <br/>
        <div class="updates">

        </div>
        <div className='PlanHeader'>
          <div><FontAwesomeIcon icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>{0} Recommended checkups</div><br />
          <div>{0} Self-added checkups</div><br />
        </div>
        <table>    
          <tr key='Health Status' name='Health Status' onClick={(e)=>healthStatusClickHandler(props.location.state.user_id)} >
            <td name='Health Status'>Your Health Plan</td><td></td>
            <td><ArrowForwardIcon /></td>
          </tr>
        </table>
        <button  onClick={viewPDF} >View PDF</button>
      </div>
    )
}
export default MyProfile
