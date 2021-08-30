import 'date-fns';
import React from 'react';
import './style.css'
import {FormHelperText} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePickerv1=({children,name,defaultValue,onChange,required,error,validate})=> {

  return (
    <div className='DatePicker1' noValidate>
    <label>{children} {required && <span style={{color:'red'}}>*</span>}</label> <br/>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker    
          name={name}
         // label={name}
          onBlur={required && validate}
          format="dd/MM/yyyy"
          placeholder="dd/MM/yyyy"
          value={defaultValue}
          onChange={onChange}
        />
       
    </MuiPickersUtilsProvider>
    { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
    </div>
  );
}
export default DatePickerv1