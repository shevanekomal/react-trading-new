import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
const FormRow = ({ type, label, name, changeHandler ,required,error,isTooltip,...otherProps}) => {
  return (
    <div className="container">
      <label>{label}{required && <span style={{color:'red'}}>*</span>}</label>
      <input type={type} name={name} onChange={changeHandler}  {...otherProps} required={required}/>
      {isTooltip && <FontAwesomeIcon icon={faQuestionCircle} color="#17416B" size={'1x'} />}
      { error && (<><br/><span style={{color:"red"}}>{error}</span></>) }
    </div>
  );
};
export default FormRow;
