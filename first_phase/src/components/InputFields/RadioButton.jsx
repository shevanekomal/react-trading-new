import {Radio,RadioGroup,FormControlLabel,FormControl,FormHelperText} from '@material-ui/core';
import {useState} from 'react'
const RadioButton =({children,name,options,defaultValue,onChange,required,error,validate})=> {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };
  return (
    <div>
    <FormControl className='RadioButton' component="fieldset" required>
    <label>{children} {required && <span style={{color:'red'}}>*</span>}</label>
    <RadioGroup aria-label={children} name={name} value={value} onChange={handleChange} onBlur={required && validate}>
    {
      options.map(option=>
        <FormControlLabel  key={option.value} value={option.value} control={<Radio />} label={option.text} />
        )
    }
    </RadioGroup>
    { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
  </FormControl>
  </div>
  )
}
export default RadioButton