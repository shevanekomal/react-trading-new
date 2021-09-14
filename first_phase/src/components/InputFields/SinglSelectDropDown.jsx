
import {FormControl,Select,FormHelperText,InputLabel} from '@material-ui/core';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
const SinglSelectDropDown = ({children,name,options,onChange,required,error,validate,isTooltip,tooltipTitle,placeholder}) => { 
  const CustomizedTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#07213C',
      color: 'white',
      border: '1.29682px solid #07213C',
      borderradius: '2.66977px'
    },
  }))(Tooltip);

    return (
      <div className='container'>
        <FormControl className='SinglSelectDropDown'required>
        <label>{children} {required && <span style={{color:'red'}}>*</span>}</label>
        <div style={{display:'flex'}}>
        <Select
          native
          onChange={onChange}
          showCheckbox={true}
          name={name}
          placeholder={placeholder}
          onBlur={required && validate}
        >{
          options.map(option=>
            <option key={option.value} aria-label={option.text} value={option.value}>{option.text}</option>
          )
        }
        </Select>
        {isTooltip && <CustomizedTooltip title={tooltipTitle} placement="bottom"><HelpIcon className = "TooltipClass"/></CustomizedTooltip> }
        </div>
        { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
      </FormControl>
      </div>
    )
}
export default SinglSelectDropDown