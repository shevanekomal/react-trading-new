import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const MyProfile =(props)=> {
  const healthStatusClickHandler = (user_id) =>{
    props.history.push({
      pathname: '/healthPlan',
      state: {user_id:user_id}, // added by swap - here main user id needed
    })
   }

  
    return (
      <div>
        <label><b>{new Date().toLocaleString('en-us',{day:'numeric'}) +' '+ new Date().toLocaleString('en-us',{month:'long', year:'numeric'}) }</b></label>
        <table>    
          <tr key='Health Status' name='Health Status' onClick={(e)=>healthStatusClickHandler(props.location.state.user_id)} >
            <td name='Health Status'>Health Status</td><td></td>
            <td><FontAwesomeIcon  name='Health Status' icon={faAngleRight} color="#17416B" size={'lg'} /></td>
          </tr>
        </table>
      </div>
    )
}
export default MyProfile
