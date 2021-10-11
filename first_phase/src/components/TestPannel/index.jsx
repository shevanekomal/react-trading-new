import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Health from '../../assets/Health.svg'
import Health2 from '../../assets/Health2.svg'
import './TestPannel.css'
import {useWindowSize} from '../../utility'
const TestPannel = ({test,clickHandler,testName,planType}) =>{
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const CustomizedTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#07213C',
      color: 'white',
      border: '1.29682px solid #07213C',
      borderradius: '2.66977px'
    },
  }))(Tooltip);

const [width] = useWindowSize();
    return (
      <div className='TestPannel'>
         {planType === 'recomm' && <div><b>{test.testName ==='Diagnostic' ? 'Diagnostic Tests':test.testName+'s'}</b>&nbsp;
         <Grid item style={{display: '-webkit-inline-box'}}>
          <ClickAwayListener onClickAway={handleTooltipClose}>
          <div> <CustomizedTooltip title={test.testName ==='Blood Test' ? (' You can get these checks done at your preferred lab. Make sure all these are included in the package you choose.Click on any checkup name to know more personalised details & organise your appointments.')
          :(test.testName ==='Diagnostic' ?'You can get these checks done at your preferred diagnostic lab or hospital.':'You can visit your preferred doctors. Remember to ask the physician doctor about the vaccines listed here. ') } placement="bottom"   onClose={handleTooltipClose}
               
               open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener><InfoIcon className = "TooltipClass" onClick={handleTooltipOpen}/></CustomizedTooltip> </div>
                </ClickAwayListener>
              </Grid>
         </div>}
          <table><tbody>
          { planType === 'recomm' ? (test.testTypes.length && test.testTypes.map((el)=>(<tr key={el.checkup_id} onClick={()=>clickHandler(el,testName)} > 
            <td>{el.recomm_level == 1 ? (<img src ={Health} width="20" height="20"/>) : (<img src ={Health2} width="20" height="20" />)}</td>
            {width < 600 ? (<><td>{el.checkup_name}</td><td><FontAwesomeIcon icon={faAngleRight} color="#17416B" size={'lg'} /></td> </>):<td><span style={{textDecoration:'underline',    cursor: 'pointer'}}>{el.checkup_name}</span></td>}
            <td></td>
            </tr>))) 
            :(<tr  onClick={()=>clickHandler(test.checkup_name) }><td></td>
              {width < 600 ? (<><td>{test.checkup_name}</td><td><FontAwesomeIcon icon={faAngleRight} color="#17416B" /></td> </>):<td><span style={{textDecoration:'underline',    cursor: 'pointer'}}>{test.checkup_name}</span></td>}
            <td></td>
             </tr>)}
            </tbody>
          </table>
      </div>
    )
  }
export default TestPannel 
