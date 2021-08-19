import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Health from '../../assets/Health.svg'
import './TestPannel.css'
import {useWindowSize} from '../../utility'
const TestPannel = ({test,clickHandler,testName}) =>{
const [width] = useWindowSize();
    return (
      <div className='TestPannel'>
          <div>{test.testName}</div>
          <table><tbody>
          {test.testTypes.length && test.testTypes.map((el)=>(<tr key={el.checkup_id} onClick={()=>clickHandler(el,testName)} > 
            <td>{el.recomm_level == 1 ? (<img src ={Health} />) : ''}</td>
            {width < 600 ? (<><td>{el.checkup_name}</td><td><FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></td> </>):<td><span style={{textDecoration:'underline',    cursor: 'pointer'}}>{el.checkup_name}</span></td>}
            <td></td>
            </tr>))}
            </tbody>
          </table>
      </div>
    )
  }
export default TestPannel 
