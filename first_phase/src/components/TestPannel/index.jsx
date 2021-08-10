
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faInfoCircle,faAngleRight} from "@fortawesome/free-solid-svg-icons";
import './TestPannel.css'
const TestPannel = ({test,clickHandler}) =>{

    return (
      <div className='TestPannel'>
          <div>{test.testName}</div>
          <table><tbody>
          {test.testTypes.length && test.testTypes.map((el)=>(<tr key={el.checkup_id} onClick={()=>clickHandler(el)} > 
            <td>{el.recomm_level == 1 ? (<FontAwesomeIcon icon={faHeart} color="#0B7D6C" size={'1x'} />) : ''}</td>
            <td>{el.checkup_name} <FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></td>
           
            </tr>))}
            </tbody>
          </table>
      </div>
    )
  }
export default TestPannel 
