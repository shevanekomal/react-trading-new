import React from 'react'
import { Multiselect } from "multiselect-react-dropdown";
export default function MultiSelectDropDown({options,onMulitiselcetChange,name}) {
  return (
       <Multiselect
              options={options}
              displayValue="key"
              showCheckbox={true}
              name={name}
              onSelect={(selectedList,addedItem)=>{onMulitiselcetChange(name,addedItem,'onSelect')}}
              onRemove={(selectedList,RemovedItem)=>{onMulitiselcetChange(name,RemovedItem,'onRemove')}}
            />
  )
}
