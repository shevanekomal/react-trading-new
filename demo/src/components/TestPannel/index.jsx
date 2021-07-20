
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faInfoCircle,faAngleRight} from "@fortawesome/free-solid-svg-icons";
import './TestPannel.css'
const TestPannel = ({test}) =>{
    return (
      <div className='TestPannel'>
          <div>{test.testName}</div>
          <a href='#'>View provider options </a> <span><FontAwesomeIcon icon={faInfoCircle} color="#17416B" size={'1x'} /></span>
          <table><tbody>
          {test.testTypes.map(type=>(<tr key={type.name} > 
            <td>{type.recommended ? (<FontAwesomeIcon icon={faHeart} color="#0B7D6C" size={'1x'} />) : ''}</td>
            <td>{type.name}</td>
            <td><a><FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></a></td>
            </tr>))}
            </tbody>
          </table>
      </div>
    )
  }
export default TestPannel 
