
import {FormControl,Select,FormHelperText} from '@material-ui/core';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
const SinglSelectDropDown = ({children,name,options,onChange,required,error,validate,isTooltip,tooltipTitle}) => { 
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
        {/* <InputLabel htmlFor="age-native-required">{children}</InputLabel> */}
        <label>{children} {required && <span style={{color:'red'}}>*</span>}</label>
        <Select
          native
          onChange={onChange}
          name={name}
          onBlur={required && validate}
        >{
          options.map(option=>
            <option key={option.value} aria-label={option.text} value={option.value}>{option.text}</option>
          )
        }
        </Select>
        {isTooltip && <CustomizedTooltip title={tooltipTitle} placement="bottom"><HelpIcon className = "TooltipClass"/></CustomizedTooltip> }
        { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
      </FormControl>
      </div>
    )
}
export default SinglSelectDropDown