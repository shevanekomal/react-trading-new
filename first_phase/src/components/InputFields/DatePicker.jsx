import {TextField,FormHelperText} from '@material-ui/core';
import './style.css'
export default function DatePickers({children,name,defaultValue,onChange,required,error,validate}) {
  return (
    <div className='DatePicker' noValidate>
     <label>{children} {required && <span style={{color:'red'}}>*</span>}</label> <br/>
      <TextField
        id="date"
        type="date"
       // label={label}
        name={name}
        defaultValue={defaultValue}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
        onBlur={required && validate}
      />
       { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
    </div>
  );
}
