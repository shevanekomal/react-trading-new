import React,{useEffect,useContext} from 'react'
import {Schedular} from '../InputFields'
import PlusCircle from '../../assets/PlusCircle.png'
import './CalenderDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarker,faLink} from "@fortawesome/free-solid-svg-icons";
import { FieldDataContext } from '../../context/FieldData'
const CalenderDetails =()=>{
  
  const {
    getAppointments
  } = useContext(FieldDataContext)
  const clickHandler=(e)=>{
    let date = document.getElementsByClassName('MuiButton-label')[1].innerHTML
    getAppointments().then(result=>{

    })
  }
  useEffect(()=>{
    clickHandler()
  },[])
  //sample data
   const appointments = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2021, 9, 23, 12, 30), //(year,month-1,date,time hh,time mm)
      endDate: new Date(2021, 9, 23, 11, 30),
    }, 
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2021, 9, 24, 9, 30),
      endDate: new Date(2021, 9, 24, 11, 30),
    }, 
  ];
  return (
    <div className='CalenderContainer'>
    <div><img src={PlusCircle} alt="Add_member Logo"  /> <span>Create</span></div>
    
       
      <Schedular clickHandler={clickHandler} scheduledAppointments={appointments}/>
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
export default CalenderDetails
