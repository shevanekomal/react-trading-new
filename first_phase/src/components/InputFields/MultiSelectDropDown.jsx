import React from 'react'
import { Multiselect } from "multiselect-react-dropdown";
export default function MultiSelectDropDown({options}) {
  return (
       <Multiselect
              options={options}
              displayValue="key"
              showCheckbox={true}
            />
  )
}
