import './style.css'
const FormRow = ({ type, label, name, changeHandler ,required,...otherProps}) => {
  console.log(otherProps)
  return (
    <div className="container">
      <label>{label}</label>
      <input type={type} name={name} onChange={changeHandler} {...otherProps} required={required}/>
    </div>
  );
};
export default FormRow;
