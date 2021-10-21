import React, {useEffect,useContext,useState} from 'react'
import {Schedular} from '../InputFields'
import PlusCircle from '../../assets/PlusCircle.png'
import './CalenderDetails.css'
import { FieldDataContext } from '../../context/FieldData'
import {Alerts} from '../InputFields'
import {useWindowSize} from '../../utility'
const CalenderDetails =(props)=>{
 // const [width, height] = useWindowSize();
  const {
    getAppointments,
    deleteCheckupEventPlan
  } = useContext(FieldDataContext)
  const [appointments,setResult] = useState([])
  const [open, setOpen] = useState(false);
  const clickHandler=(data)=>{
   
    deleteCheckupEventPlan(data).then((response)=>{
      if(response.status){
        setOpen(true)
      }
    })
   // let date = document.getElementsByClassName('MuiButton-label')[1].innerHTML
   /* getAppointments(props.location.state.user_id).then(result=>{
      if(result.status){
        console.log(result)
      }
    })*/
 
}
  useEffect(()=>{
   // clickHandler()
   let user_id = props.location.state.user_id
   getAppointments(user_id).then(result=>{
    if(result.status){
     if(result.data.Events.length > 0)
        setResult(result.data.Events)
    }else {
      props.history.push('/login')
    }
  })
  },[])
  //sample data
   /*const appointments = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2021, 9, 24, 9, 30), //year month-1,date , hh mm
      endDate: new Date(2021, 9, 24, 11, 30),
      provider: 'Room 1',
    },
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2021, 9, 25, 9, 30),
      endDate: new Date(2021, 9, 25, 11, 30),
      provider: 'Room 2',
    },
  ];*/
  const createCheckupHandler = () =>{
    props.history.push({
      pathname: '/createCheckup',
      state: {user_id:props.location.state.user_id,checkup_name:'',from:'calender'}
    })
  }
  return (
    <div className='CalenderContainer'>
      { /*width> 990 ? <div style={{marginTop:'-40px'}} className='heading'><b>Calender</b></div> :<div></div> */}
        
    <div><span  onClick={createCheckupHandler} style={{cursor: 'pointer'}}><img src={PlusCircle} alt="Add_member Logo"  /> Create</span></div>
    
     {appointments.length > 0 && <Schedular clickHandler={clickHandler} scheduledAppointments={appointments}/>}
     {appointments.length === 0 && <Schedular clickHandler={clickHandler} scheduledAppointments={appointments}/>}
     { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="success" title="Success" content={'Event deleted successfully'} autoHideDuration = '5000'
           vertical= 'top' horizontal= 'center' />}
     {/* <div className='checkupDetails'>
      <label>Checkups</label><br/>
 <div className='appointment'>
<div>checkup name here</div>
{ add dynmamic chekup data here }
<div>
<span><FontAwesomeIcon icon={faMapMarker} color="#17416B"  /> location</span>
<span><FontAwesomeIcon icon={faLink} color="#17416B"  /> url</span></div>
</div> 
</div>*/ }
    </div>
  )
}
export default CalenderDetails
