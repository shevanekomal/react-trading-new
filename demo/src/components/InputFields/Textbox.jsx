
import {OutlinedInput,InputAdornment,FormControl,FormHelperText} from '@material-ui/core';
 const Textbox=({children,type,name,endAdornment,onChange,textRef,required,error,validate,placeholder}) =>{
  return(
      <div>
        <FormControl className='Textbox' variant="outlined"  required={true}>
        <label>{children} {required && <span style={{color:'red'}}>*</span>}</label>
          <OutlinedInput
           type={type}
            endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            name={name}
            ref={textRef} 
            placeholder={placeholder}
            value={textRef.current.value}
            onChange={onChange}
            onBlur={required && validate}
          />
          { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
        </FormControl>
      </div>
  )};
  export default Textbox;
