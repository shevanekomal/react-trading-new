import React from 'react'
import { Multiselect } from "multiselect-react-dropdown";
export default function MultiSelectDropDown({options,onMulitiselcetChange,name,placeholder,required,validate}) {
  return (
       <Multiselect
              options={options}
              displayValue="key"
              showCheckbox={true}
              placeholder={placeholder}
              name={name}
              onBlur={required && validate}
              onSelect={(selectedList,addedItem)=>{onMulitiselcetChange(name,addedItem,'onSelect')}}
              onRemove={(selectedList,RemovedItem)=>{onMulitiselcetChange(name,RemovedItem,'onRemove')}}
            />
  )
}
