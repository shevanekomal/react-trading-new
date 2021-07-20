import { makeStyles,FormLabel,FormControl,FormGroup,FormControlLabel,Checkbox ,FormHelperText} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup({children,name,options,onChange,required,error,validate}) {
  const classes = useStyles();
  return (
    <div className='Checkbox'>
      <FormControl component="fieldset" name={name}  onChange={onChange} onBlur={required && validate}>
        <label>{children}{required && <span style={{color:'red'}}>*</span>}</label>
        <FormGroup>{
          options.map(option=><FormControlLabel
          key = {option.name}
            control={<Checkbox checked={option.checked} name={name} value={option.name}/>}
            label={option.text}
          />)
        }
        </FormGroup>
        { error && <FormHelperText id="outlined-weight-helper-text" style={{color:"red"}}>{error}</FormHelperText> }
      </FormControl>
    </div>
  );
}
