export default function CheckboxesGroup({children,name,options,onChange,required,error,validate,label,defaultValue}) {
  return (
    <div className='Checkbox'>
      <label className='CheckboxHeader'>{label}{required && <span style={{color:'red'}}> *</span>}{children}</label><br/>
      {options.map(option=>(<>
  <input type="checkbox" checked={(defaultValue && defaultValue.includes(option.name)) ? true : option.checked} name={name} value={option.name} disabled={option.disabled} onChange={onChange} onBlur={required && validate} />  <label> {option.name}</label><br/></>))
          }
     
    </div>
  );
}
