import './style.css'
const FormRow = ({ type, label, name, changeHandler ,required,error,...otherProps}) => {
  return (
    <div className="container">
      <label>{label}{required && <span style={{color:'red'}}>*</span>}</label>
      <input type={type} name={name} onChange={changeHandler}  {...otherProps} required={required}/>
      { error && (<><span style={{color:"red"}}>{error}</span></>) }
    </div>
  );
};
export default FormRow;
