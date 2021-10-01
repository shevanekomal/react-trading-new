import React from 'react'
import {Schedular} from '../InputFields'
import PlusCircle from '../../assets/PlusCircle.png'
import './CalenderDetails.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarker,faLink} from "@fortawesome/free-solid-svg-icons";
export default function index() {
  const clickHandler=(e)=>{
    console.log("clickHandler",e.target.innerHTML)
  }
  return (
    <div className='CalenderContainer'>
    <div><img src={PlusCircle} alt="Add_member Logo"  /> <span>Create</span></div>
    
       
      <Schedular clickHandler={clickHandler}/>
      <div className='checkupDetails'>
      <label>Checkups</label><br/>
<div className='appointment'>
<div>checkupn name here</div>
{/* add dynmamic chekup data here */}
<div>
<span><FontAwesomeIcon icon={faMapMarker} color="#17416B"  /> location</span>
<span><FontAwesomeIcon icon={faLink} color="#17416B"  /> url</span></div>
</div>
      </div>
      
    </div>
  )
}
