//import './style.css'
import Input from '@material-ui/core/Input';
const InputBox = ({ type, label, name, placeholder,changeHandler,defaultValue ,required,error,...otherProps}) => {
  return (
    <div >
       <Input placeholder={placeholder} name={name} onChange={changeHandler} value={defaultValue} {...otherProps} required={required}/>
      { error && (<><span style={{color:"red"}}>{error}</span></>) }
    </div>
  );
};
export default InputBox;
