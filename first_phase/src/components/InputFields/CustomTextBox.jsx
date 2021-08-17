import './style.css'
const CustomTextBox=({type,name,state,setState,endAdornment,children,required,...fiedProps})=> {
  return (
    <>
    <label className='CustomTextBoxLabel'>{children}</label>{required && <span style={{color:'red'}}>*</span>}
    <div className='CustomTextBox'>
    <input type={type} name={name} value={state[name].value} {...fiedProps} onChange={e => {
       let value = e.target.value;
       var keyCode = e.keyCode || e.which; 
  console.log(e,"keyCode")
      if(name==='height' && value.length >1){
        let val = value.toString().replace("'","");
        value = val.substr(0,1)+"'"+val.substr(1);
      }
      setState({ ...state,[name]: {value} })}
    } /> 
    {endAdornment && <input type='text' value={endAdornment} readOnly />}
    </div>
    </>
  )
}
export default CustomTextBox 
