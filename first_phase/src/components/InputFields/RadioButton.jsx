import {Radio,RadioGroup,FormControlLabel,FormControl,FormHelperText} from '@material-ui/core';
import {useState} from 'react'
const RadioButton =({children,name,options,defaultValue,onChange,required,error,validate,valueText})=> {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };
  const radioPattern = (name==='addNewField1') ? 'row':'column';
  return (
    <div className='container'>
    <FormControl className='RadioButton' component="fieldset" required>
    <label style={{display: 'block'}}>{children}{required && <><span style={{color:'red'}}> *</span><br /></>}{valueText}</label>
     
{/* 
    <label>{children} {required && <span style={{color:'red'}}>*</span>} </label>
    <label>{valueText}</label> */}
    <RadioGroup style={{flexDirection:`${radioPattern}`}}  aria-label={children} name={name} value={`${radioPattern}` === 'row' ?value :(defaultValue || value)} onChange={handleChange} onBlur={required && validate}>
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