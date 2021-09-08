import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
const FormRow = ({ type, label, name, changeHandler ,required,error,isTooltip,tooltipTitle,...otherProps}) => {

  const CustomizedTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#07213C',
      color: 'white',
      border: '1.29682px solid #07213C',
      borderradius: '2.66977px'
    },
  }))(Tooltip);

  return (
    <div className="container">
      <label>{label}{required && <span style={{color:'red'}}>*</span>}</label>
      <input type={type} name={name} onChange={changeHandler}  {...otherProps} required={required}/>
      {isTooltip &&<CustomizedTooltip title={tooltipTitle} placement="bottom"><HelpIcon className = "TooltipClass" /></CustomizedTooltip>}
      { error && (<><br/><span style={{color:"red"}}>{error}</span></>) }
    </div>
  );
};
export default FormRow;
