import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Health from '../../assets/Health.svg'
import Health2 from '../../assets/Health2.svg'
import './TestPannel.css'
import {useWindowSize} from '../../utility'
const TestPannel = ({test,clickHandler,testName,planType}) =>{
const [width] = useWindowSize();
    return (
      <div className='TestPannel'>
         {planType === 'recomm' && <div><b>{test.testName}</b></div>}
          <table><tbody>
          { planType === 'recomm' ? (test.testTypes.length && test.testTypes.map((el)=>(<tr key={el.checkup_id} onClick={()=>clickHandler(el,testName)} > 
            <td>{el.recomm_level == 1 ? (<img src ={Health} width="20" height="20"/>) : (<img src ={Health2} width="20" height="20" />)}</td>
            {width < 600 ? (<><td>{el.checkup_name}</td><td><FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></td> </>):<td><span style={{textDecoration:'underline',    cursor: 'pointer'}}>{el.checkup_name}</span></td>}
            <td></td>
            </tr>))) 
            :(<tr  onClick={()=>clickHandler(test.checkup_name) }>
              {width < 600 ? (<><td>{test.checkup_name}</td><td><FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></td> </>):<td><span style={{textDecoration:'underline',    cursor: 'pointer'}}>{test.checkup_name}</span></td>}
            <td></td>
             </tr>)}
            </tbody>
          </table>
      </div>
    )
  }
export default TestPannel 
