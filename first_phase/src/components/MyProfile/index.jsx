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
import {Alerts,Carousell} from '../InputFields'
import {useWindowSize} from '../../utility'

const MyProfile =(props)=> {
  const [width, height] = useWindowSize();
  const {
    getUserNotifications,
    getRecommendedAndSelfAddedCount
  } = useContext(FieldDataContext)
  const [result,setResult] = useState({ updatesList : ['welcome','advice','addMember','healthStatus','PastCheckup','reminder'],
  day:'Today'})
  const [open, setOpen] = useState(false);
  const [recommCount, SetRecommCount] = useState(0);
  const [selfCount, SetSelfCount] = useState(0);
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  let alertMsg = ''
  //reffer below result
   /*const result={
     updatesList : ['welcome','advice','addMember','healthStatus','PastCheckup','reminder'],
     day:'Today'
   }*/
  useEffect(()=>{
   
    getUserNotifications(props.location.state.user_id,props.location.state.user_type).then((result)=>{
   if(result.status){
     setResult(result.data.result)
     setItems1(result.data.healthyHabits);
     setItems2(result.data.knowYourSelf);
     //setItems3(result.data.knowYourSelf);
   }else {
     alertMsg = result.messages || "something went wrong!!"
     setOpen(true);
     props.history.push({
      pathname: '/login'
    })
   }
      
     
  })
  //to get recommended and self added count
  getRecommendedAndSelfAddedCount(props.location.state.user_id).then((result)=>{
    if(result.status){
      SetRecommCount(result.data.recommendedcount)
      SetSelfCount(result.data.selfAddedCount)
    }else {
      props.history.push({
        pathname: '/login'
      })
    }
})
//setItems1([{id:0,name:'Physical'},{id:1,name:'Mental'},{id:2,name:'Self-examination'},{id:3,name:'Dental'},{id:4,name:'Seasonal & Others'}]);
  
//setItems2([{id:0,name:'Medical Checkups'},{id:1,name:'Physical Wellbeing'},{id:2,name:'Sleep'},{id:3,name:'Heart Health'},{id:4,name:'Vitamin B12'}]);

setItems3([{id:0,name:'Medical Checkups',text:''},{id:1,name:'Physical Wellbeing',text:''},{id:2,name:'Sleep',text:'Upcoming in 1 week'},{id:3,name:'Heart Health',text:'Upcoming'},{id:4,name:'Vitamin B12',text:'Upcoming'}]);

},[])
  const healthStatusClickHandler = (user_id) =>{
    props.history.push({
      pathname: '/healthPlan',
      state: {user_id:user_id}, // added by swap 
    })
   }

   const handleClick = () =>{
    
  //  console.log(name)
    props.history.push({
      pathname: '/knowYourself',
      state: {user_id:props.location.state.user_id},
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
      return <UpdatePanelStrip header={"Know Yourself - Checkups"} subHeader={'Answer quick questions to learn if you are on top of your checkups.'} tag='Know' actionPath={items2.map((item) => (item.name === 'Medical Checkups') && (item.isDone ? '/knowYourselfResult':'/knowYourself') )} self='true' name={'Medical Checkups'} list = {result.updatesList} user_id={props.location.state.user_id} />
    }
    case 'advice':{
      return <UpdatePanelStrip header={"Know Yourself - Physical Wellbeing"} subHeader={'Take a minute to check your BMI & how your body is doing.'} tag='Know' actionPath={items2.map((item) => (item.name === 'Physical Wellbeing') && (item.isDone ? '/knowYourselfResult':'/knowYourself' ))} self='true' name={'Physical Wellbeing'} self='true' list = {result.updatesList} user_id={props.location.state.user_id} />
    }
    case 'addMember':{
      return <UpdatePanelStrip header={"Add your family members."} subHeader={'Create personalised health plans for your loved ones'} actionPath='/userHome' self='false' user_id={props.location.state.user_id} />
    }
    case 'healthStatus':{
      return <UpdatePanelStrip header={"Welcome! To best experience your personalised health journey, click on these Updates one-by-one."} subHeader={'Start by updating your health status to view your personalised checkup plan.'} tag='Checkup' actionPath='/addRisk' self='false' user_id={props.location.state.user_id} />
    }
    case 'healthPlan':{
      return <UpdatePanelStrip header={"Welcome! To best experience your personalised health journey, click on these Updates one-by-one."} subHeader={'Start by checking the personalised checkup plan made for you.'} tag='Checkup' actionPath='/healthPlan' user_id={props.location.state.user_id} />
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
    state: {user_id:props.location.state.user_id,checkup_name:'',from:'calender'}
  })
}
  
    return (
      <div className='MyProfileContainer'>
         {width> 990 ? <div style={{marginTop:'-15px'}} className='heading'><b>Your Profile</b></div> :<div></div>}
         
        {width > 990 ?( <div> 
          <span className="iconDiv"><img src={props.location.state.profileIcon}></img> <b>&nbsp;&nbsp;{props.location.state.name !== undefined && props.location.state.name.split(' ')[0]}</b></span>
          <SettingsIcon style={{cursor: 'pointer'}} onClick={handleSettings}/>
        </div>): ( <div style={{marginTop:'20px'}}> 
          <span className="iconDiv"><img src={props.location.state.profileIcon}></img> <b>&nbsp;&nbsp;{props.location.state.name !== undefined && props.location.state.name.split(' ')[0]}</b></span>
          <SettingsIcon style={{cursor: 'pointer'}} onClick={handleSettings}/>
        </div>) }
        <div className="curentDateContainer">
        <div>
          <span>{new Date().toLocaleString('en-us',{day:'numeric'}) +' '+ new Date().toLocaleString('en-us',{month:'long', year:'numeric'}) }</span>
          <span style={{cursor: 'pointer'}} onClick={handleCalender}>Open Calender{' '}
          <FontAwesomeIcon  name='calender' icon={faAngleRight} onClick={handleCalender} color="#17416B" size={'sm'} /></span>
        </div>
        <div style={{margin:'auto',marginRight:'0px'}}>
        <img src={PlusCircle} alt="Add_member Logo" onClick={createCheckupHandler} /> <span onClick={createCheckupHandler}>Create</span>
        </div>
        </div>
        {result.updatesList.length > 0 && <div className="Updates">
        <div className='UpdatesHeader'>
          <div>Updates{/*!isRead &&<span className='ProfileButtonContainer'><span>{result.updatesList.length}</span></span>*/}</div>
         {/*  <div onClick={()=>{setIsRead(true)}}>Mark as read</div> */}
        </div>
        <div style={{cursor: 'pointer'}} className='UpdatesList'>
        <center>{result.day}</center>
        {result.updatesList.map(keyWord=>getUpdateComponent(keyWord))}
        </div>

        </div>}
       
          <div  style={{cursor: 'pointer'}} className='healthPlanNavigation'  onClick={(e)=>healthStatusClickHandler(props.location.state.user_id)}>
          <span>Your Medical Checkups</span>
          <ArrowForwardIcon />
        </div>
        <br />
        <div className='PlanHeader'>
          <div><FontAwesomeIcon style={{marginTop: '2px'}} icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          <div>
          <span className='checkupType'>{recommCount} Recommended checkups</span><br />
          <span className='checkupType'>{selfCount} &nbsp; Self-added checkups</span></div>
          
        </div>
        <div  style={{cursor: 'pointer'}} className='healthPlanNavigation' 
         onClick={(e)=>props.history.push({
          pathname: '/gridListView',
          state: {user_id:props.location.state.user_id,items:items1,name:'your healthy habits'}
          })}>
          <span>Your Healthy Habits</span>
          <ArrowForwardIcon />
         </div>
         <div className='CarousellHeader'>
          <Carousell backgroundColorOdd='#EEF8FF' backgroundColorEven = '#E8F2FA' props={props} items={items1} name='your healthy habits' list={result.updatesList}></Carousell>
        </div>
          <div  style={{cursor: 'pointer'}} className='healthPlanNavigation'  onClick={(e)=>props.history.push({
          pathname: '/gridListView',
          state: {user_id:props.location.state.user_id,items:items2,name:'know yourself'}
          })}>
          <span>Know Yourself</span>
          <ArrowForwardIcon />
         </div>
         <div className='CarousellHeader'>
          <Carousell backgroundColorOdd='#DAEDEB' backgroundColorEven = '#FFD3B1' props={props} items={items2} name='know yourself' list={result.updatesList} ></Carousell>
          </div>
          <div  style={{cursor: 'pointer'}} className='healthPlanNavigation'  onClick={(e)=>props.history.push({
          pathname: '/gridListView',
          state: {user_id:props.location.state.user_id,items:items3,name:'know health topics'}
          })}>
          <span>Know Health Topics</span>
          <ArrowForwardIcon />
         </div>
         <div className='CarousellHeader'>
          <Carousell backgroundColorOdd='#DAEDEB' backgroundColorEven = '#FFD3B1' props={props} items={items3} name='know health topics' ></Carousell>
          </div>
      
      {/*  <button  onClick={viewPDF} >View PDF</button> */}
        { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="error" title="Error" content={"Something went wrong."} autoHideDuration = '10000'
           />}
      </div>
    )
}
export default MyProfile
