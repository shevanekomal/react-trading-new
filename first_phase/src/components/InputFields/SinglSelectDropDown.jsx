
import {FormControl,Select,FormHelperText} from '@material-ui/core';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
const SinglSelectDropDown = ({children,name,options,onChange,required,error,validate,isTooltip}) => { 
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
        {isTooltip && <FontAwesomeIcon icon={faQuestionCircle} color="#17416B" size={'1x'} /> }
        { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
      </FormControl>
      </div>
    )
}
export default SinglSelectDropDown