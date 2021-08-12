import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faAngleRight} from "@fortawesome/free-solid-svg-icons";
import './TestPannel.css'
import {useWindowSize} from '../../utility'
const TestPannel = ({test,clickHandler,testName}) =>{
const [width] = useWindowSize();
    return (
      <div className='TestPannel'>
          <div>{test.testName}</div>
          <table><tbody>
          {test.testTypes.length && test.testTypes.map((el)=>(<tr key={el.checkup_id} onClick={()=>clickHandler(el,testName)} > 
            <td>{el.recomm_level == 1 ? (<FontAwesomeIcon icon={faHeart} color="#0B7D6C" size={'1x'} />) : ''}</td>
            <td>{width < 600 ? (<>{el.checkup_name} <FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></>):<span style={{textDecoration:'underline',    cursor: 'pointer'}}>{el.checkup_name}</span>}</td>
            </tr>))}
            </tbody>
          </table>
      </div>
    )
  }
export default TestPannel 
