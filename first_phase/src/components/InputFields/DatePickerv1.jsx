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
  
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='DatePicker1' noValidate>
    <label>{children} {required && <span style={{color:'red'}}>*</span>}</label> <br/>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker    
          id={name}
         // label={name}
          format="dd/MM/yyyy"
          value={defaultValue}
          onChange={onChange}
        />
       
    </MuiPickersUtilsProvider>
    { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
    </div>
  );
}
export default DatePickerv1