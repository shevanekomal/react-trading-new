import React from 'react'
import {Schedular} from '../InputFields'
import PlusCircle from '../../assets/PlusCircle.png'
import './CalenderDetails.css'
export default function index() {
  const clickHandler=(e)=>{
    console.log("clickHandler",e.target.innerHTML)
  }
  return (
    <div className='CalenderContainer'>
    <div><img src={PlusCircle} alt="Add_member Logo"  /> <span>Create</span></div>
    
       
      <Schedular clickHandler={clickHandler}/>
      <div className='checkupDetails'>
      <label>Checkups</label>
      </div>
      
    </div>
  )
}
