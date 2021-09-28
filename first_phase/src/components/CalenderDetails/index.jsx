import React from 'react'
import {Schedular} from '../InputFields'
import PlusCircle from '../../assets/PlusCircle.png'
import './CalenderDetails.css'
export default function index() {
  return (
    <div className='CalenderContainer'>
    <div><img src={PlusCircle} alt="Add_member Logo"  /> <span>Create</span></div>
    
       
      <Schedular />
      <div className='checkupDetails'>
      <label>Checkups</label>
      </div>
      
    </div>
  )
}
