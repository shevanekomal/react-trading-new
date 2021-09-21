export default function CheckboxesGroup({children,withoutLable,name,options,onChange,required,error,validate,label,defaultValue}) {
  return (
    <div className='Checkbox'>
      {!withoutLable && (<><label className='CheckboxHeader'>{label}{required && <span style={{color:'red'}}> *</span>}{children}</label><br/></>)}
      {options.map(option=>(<>
  <input type="checkbox" checked={(defaultValue && defaultValue.includes(option.name)) ? true : option.checked} name={name} value={option.name} disabled={option.disabled} onChange={onChange} onBlur={required && validate} />  <label style={{fontSize:name=='loginWithOtp' && '14px'}}> {option.name}</label><br/></>))
          }
     
    </div>
  );
}
