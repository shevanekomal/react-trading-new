import './MyProfile.css'
import { useState,useEffect,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,faClipboardList } from "@fortawesome/free-solid-svg-icons";
import PlusCircle from '../../assets/PlusCircle.png'
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UpdatePanelStrip from './UpdatePanelStrip';
import { FieldDataContext } from '../../context/FieldData'
const MyProfile =(props)=> {
  
  const {
    getUserNotifications
  } = useContext(FieldDataContext)
  const [result,setResult] = useState({})
  //reffer below result
  // const result={
  //   updatesList : ['welcome','advice','addMember','healthStatus','PastCheckup','reminder'],
  //   day:'Today'
  // }
  useEffect(()=>{
    getUserNotifications(props.location.state.user_id,props.location.state.user_type).then((result)=>{
      (result.status) ? setResult(result.data): alert(result.messages || "something went wrong!!")
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
      return <UpdatePanelStrip header={"Welcome! Let's start by learning about your body."} subHeader={'View all your recommended tests in Your Health Plan'} tag='advice' actionPath='/' />
    }
    case 'advice':{
      return <UpdatePanelStrip header={"Everything you need to know."} subHeader={'Read it here.'} tag='advice' actionPath='/' />
    }
    case 'addMember':{
      return <UpdatePanelStrip header={"Add your family members."} subHeader={'Create personalised health plans for your loved ones'} tag='advise' actionPath='/userHome' />
    }
    case 'healthStatus':{
      return <UpdatePanelStrip header={"Update health status ."} subHeader={'To get your recommended checkups'} tag='checkup' actionPath='/addRisk' />
    }
    case 'PastCheckup ':{
      return <UpdatePanelStrip header={"Update your past checkup dates ."} subHeader={'When was the last time you did the routine blood tests? We will automatically tell you when the next one is due!'} tag='checkup' actionPath='/healthPlan' />
    }
    case 'reminder':{
      return <UpdatePanelStrip header={"Reminder: You have a checkup tomorrow."} subHeader={'Remember to take your past records & any questions you have.'} tag='checkup' actionPath='/calender' />
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
    state: {user_id:props.location.state.user_id}, // added by swap
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
        <div>
          <span className="iconDiv"><img src={props.location.state.profileIcon}></img> {props.location.state.name}</span>
          <SettingsIcon onClick={handleSettings}/>
        </div>
        <div className="curentDateContainer">
        <div>
          <span>{new Date().toLocaleString('en-us',{day:'numeric'}) +' '+ new Date().toLocaleString('en-us',{month:'long', year:'numeric'}) }</span>
          <span onClick={handleCalender}>Open Calender</span>{' '}<FontAwesomeIcon  name='calender' icon={faAngleRight} onClick={handleCalender} color="#17416B" size={'sm'} />
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
        <div className='UpdatesList'>
        <center>{result.day}</center>
        {result.updatesList.map(keyWord=>getUpdateComponent(keyWord))}
        </div>

        </div>
        <div className='PlanHeader'>
          <div><FontAwesomeIcon icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>
          <span className='checkupType'>{0} Recommended checkups</span><br />
          <span className='checkupType'>{0} Self-added checkups</span></div>
          
        </div>
        <div className='healthPlanNavigation'  onClick={(e)=>healthStatusClickHandler(props.location.state.user_id)}>
          <span>Your Health Plan</span>
          <ArrowForwardIcon />
        </div>
        <button  onClick={viewPDF} >View PDF</button>
      </div>
    )
}
export default MyProfile
