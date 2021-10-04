import './MyProfile.css'
import { useState,useEffect,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,faClipboardList } from "@fortawesome/free-solid-svg-icons";
import PlusCircle from '../../assets/PlusCircle.png'
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import UpdatePanelStrip from './UpdatePanelStrip';
import { FieldDataContext } from '../../context/FieldData'
import {Alerts} from '../InputFields'
const MyProfile =(props)=> {
  
  const {
    getUserNotifications,
    getRecommendedAndSelfAddedCount
  } = useContext(FieldDataContext)
  const [result,setResult] = useState({ updatesList : ['welcome','advice','addMember','healthStatus','PastCheckup','reminder'],
  day:'Today'})
  const [open, setOpen] = useState(false);
  const [recommCount, SetRecommCount] = useState(0);
  const [selfCount, SetSelfCount] = useState(0);
  let alertMsg = ''
  //reffer below result
   /*const result={
     updatesList : ['welcome','advice','addMember','healthStatus','PastCheckup','reminder'],
     day:'Today'
   }*/
  useEffect(()=>{
    getUserNotifications(props.location.state.user_id,props.location.state.user_type).then((result)=>{
   //   console.log(result)
      alertMsg = result.messages || "something went wrong!!"
      (result.status) ? setResult(result.data): (setOpen(true))
     
  })
  //to get recommended and self added count
  getRecommendedAndSelfAddedCount(props.location.state.user_id).then((result)=>{
    if(result.status){
      SetRecommCount(result.data.recommendedcount)
      SetSelfCount(result.data.selfAddedCount)
    }
})
  },[])
  const healthStatusClickHandler = (user_id) =>{
    props.history.push({
      pathname: '/healthPlan',
      state: {user_id:user_id}, // added by swap 
    })
   }
const [isRead,setIsRead]=useState(false)

const viewPDF = () => {
    props.history.push({
      pathname: '/pdf'
    })
  }
 
const getUpdateComponent =(keyWord)=>{
  switch(keyWord){
    case 'welcome':{
      return <UpdatePanelStrip header={"Welcome! Let's start by learning about your body."} subHeader={'View all your recommended tests in Your Health Plan'} tag='Advice' actionPath='/' self='true' user_id={props.location.state.user_id} />
    }
    case 'advice':{
      return <UpdatePanelStrip header={"Everything you need to know."} subHeader={'Read it here.'} tag='Advice' actionPath='/' self='true' user_id={props.location.state.user_id} />
    }
    case 'addMember':{
      return <UpdatePanelStrip header={"Add your family members."} subHeader={'Create personalised health plans for your loved ones'} actionPath='/userHome' self='false' user_id={props.location.state.user_id} />
    }
    case 'healthStatus':{
      return <UpdatePanelStrip header={"Update health status."} subHeader={'To get your recommended checkups'} tag='Checkup' actionPath='/addRisk' self='false' user_id={props.location.state.user_id} />
    }
    case 'pastCheckup':{
      return <UpdatePanelStrip header={"Update your past checkup dates ."} subHeader={'When was the last time you did the routine blood tests? We will automatically tell you when the next one is due!'} tag='Checkup' actionPath='/healthPlan' user_id={props.location.state.user_id}/>
    }
    case 'reminder':{
      return <UpdatePanelStrip header={"Reminder: You have a checkup tomorrow."} subHeader={'Remember to take your past records & any questions you have.'} tag='Checkup' actionPath='/calender' self='true' user_id={props.location.state.user_id} />
    } 
  }
}

const handleSettings = () => {
  props.history.push({
    pathname: '/userSetting',
   state: {user_id:props.location.state.user_id,name:props.location.state.name,relation:props.location.state.relation,mobile:props.location.state.mobile,profileIcon:props.location.state.profileIcon}
  })

};

const handleCalender = () => {
  props.history.push({
    pathname: '/calender',
    state: {user_id:props.location.state.user_id},
  })
};

const createCheckupHandler = () =>{
  props.history.push({
    pathname: '/createCheckup',
    state: {user_id:props.location.state.user_id,checkup_name:''}
  })
}
  
    return (
      <div className='MyProfileContainer'>
        <div style={{marginTop:'20px'}}>
          <span className="iconDiv"><img src={props.location.state.profileIcon}></img> {props.location.state.name}</span>
          <SettingsIcon style={{cursor: 'pointer'}} onClick={handleSettings}/>
        </div>
        <div className="curentDateContainer">
        <div>
          <span>{new Date().toLocaleString('en-us',{day:'numeric'}) +' '+ new Date().toLocaleString('en-us',{month:'long', year:'numeric'}) }</span>
          <span style={{cursor: 'pointer'}} onClick={handleCalender}>Open Calender{' '}
          <FontAwesomeIcon  name='calender' icon={faAngleRight} onClick={handleCalender} color="#17416B" size={'lm'} /></span>
        </div>
        <div style={{margin:'auto',marginRight:'0px'}}>
        <img src={PlusCircle} alt="Add_member Logo" onClick={createCheckupHandler} /> <span onClick={createCheckupHandler}>Create</span>
        </div>
        </div>
        <div className="Updates">
        <div className='UpdatesHeader'>
          <div>Updates{!isRead &&<span className='ProfileButtonContainer'><span>{result.updatesList.length}</span></span>}</div>
          <div onClick={()=>{setIsRead(true)}}>Mark as read</div>
        </div>
        <div style={{cursor: 'pointer'}} className='UpdatesList'>
        <center>{result.day}</center>
        {result.updatesList.map(keyWord=>getUpdateComponent(keyWord))}
        </div>

        </div>
        <div className='PlanHeader'>
          <div><FontAwesomeIcon style={{marginTop: '2px'}} icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>
          <span className='checkupType'>{recommCount === 0 ?'-': recommCount} Recommended checkups</span><br />
          <span className='checkupType'>{selfCount === 0 ? '-': selfCount} Self-added checkups</span></div>
          
        </div>
        <div  style={{cursor: 'pointer'}} className='healthPlanNavigation'  onClick={(e)=>healthStatusClickHandler(props.location.state.user_id)}>
          <span>Your Health Plan</span>
          <ArrowForwardIcon />
        </div>
      {/*   <button  onClick={viewPDF} >View PDF</button>*/}
        { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="error" title="Error" content={"Something went wrong."} autoHideDuration = '10000'
           />}
      </div>
    )
}
export default MyProfile
