
import {FormControl,Select,FormHelperText} from '@material-ui/core';
import './style.css'
const SinglSelectDropDown = ({children,name,options,defaultValue,onChange,required,error,validate}) => { 
    return (
      <div>
        <FormControl className='SinglSelectDropDown'required>
        {/* <InputLabel htmlFor="age-native-required">{children}</InputLabel> */}
        <label>Pick your location {required && <span style={{color:'red'}}>*</span>}</label>
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
        { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
      </FormControl>
      </div>
    )
}
export default SinglSelectDropDown