import './style.css'
const CustomTextBox=({type,name,state,setState,endAdornment,children,required,validate,error,valueText,...fiedProps})=> {
  const restrictArrowEvent =(e)=>{
    var keyCode = e.which || e.keycode;
    (e.type === 'wheel') && e.target.blur();
    (e.key === 'ArrowUp' || e.key === 'ArrowDown' || keyCode == 69 || keyCode == 101) && e.preventDefault();
  }
  const restrictAlphabet =(e)=>{
   /*var x = e.which || e.keycode;
   var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8,9, 96,97,98,99,100,101,102,103,104,105];
   	if(!key_codes.includes(x))
     e.preventDefault();*/
     var allowedChars = "0123456789'";
     function contains(stringValue, charValue) {
       return stringValue.indexOf(charValue) > -1;
     }
     function startsWith(stringValue, charValue) {
      return stringValue.indexOf(charValue) > -1;
    }
     var invalidKey =(e.key.length === 1 && (!contains(allowedChars, e.key)));
     invalidKey && e.preventDefault();
   }
  return (
    <div>
    <label className='CustomTextBoxLabel'>{children}</label>{required && <span style={{color:'red'}}>*</span>}
    <label className='CustomTextBoxLabel'>{valueText}</label>
    <div className={endAdornment ? 'endAdornment CustomTextBox': 'CustomTextBox '}>
    <input type={type} name={name} value={state[name].value} {...fiedProps} onChange={e => {
       let value = e.target.value;
     
      if(name === 'height' && value.length === 1 && value.toString().startsWith('0')){
        //height start with 0 not allowd
      }
     else if(name==='height' && value.length >1){
        let val = value.toString().replace("'","");
        value = val.substr(0,1)+"'"+val.substr(1);
        setState({ ...state,[name]: {value} })
      }else{
        setState({ ...state,[name]: {value} })
      }
     }
    } 
    onKeyDown={(e)=>{type==='number' ? restrictArrowEvent(e) : restrictAlphabet(e)}}
    onWheel={(e)=>{type==='number' && restrictArrowEvent(e)}}
    onBlur={required && validate} /> 
    {endAdornment && <input type='text' value={endAdornment} readOnly />}
    </div>
    { error && (<><span style={{color:"red"}}>{error}</span></>) }
    </div>
  )
}
export default CustomTextBox 
