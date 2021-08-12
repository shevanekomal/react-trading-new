export default function CheckboxesGroup({children,name,options,onChange,required,error,validate}) {
  return (
    <div className='Checkbox'>
      <label className='CheckboxHeader'>{children}{required && <span style={{color:'red'}}>*</span>}</label>
      {options.map(option=>(<>
  <input type="checkbox" checked={option.checked} name={name} value={option.name} disabled={option.disabled}  onChange={onChange} onBlur={required && validate} />  <label> {option.name}</label><br/></>))
          }
     
    </div>
  );
}
