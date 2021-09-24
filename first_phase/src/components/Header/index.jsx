import { BrowserRouter as Router, Switch, Route, Redirect,useLocation } from "react-router-dom";
import { useState,useContext } from "react";
import { FieldDataContext } from '../../context/FieldData'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./Menubar";
import HealthPlan from "../HealthPlan";
import HealthStatusForm from '../HealthStatusForm'
import TestDetails from '../TestDetails'
import Login from '../Login'
import Register from '../Register'
import UserHome from '../UserHome'
import MyProfile from '../MyProfile'
import AddMemberForm from '../AddMemberForm'
import UserSetting from '../UserSetting'
import ShareWithMember from '../ShareWithMember'
import CreateCheckupForm from '../CreateCheckupForm'
import CalenderDetails from '../CalenderDetails'

import PdfViewer from '../PdfViewer'
import Main_logo from '../../assets/Main_logo.svg'
import {useWindowSize} from '../../utility'
import linkedin from '../../assets/linkedin.svg'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
const Header = (props) => {
  const {
    loginUserId,
    user_id
  } = useContext(FieldDataContext)
  const history = useHistory();
  const currentPath = useLocation().pathname
  const deafulClasses = {
    homeLinkClass: "nav-item nav-link",
    featureLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    resgisterLinkClass: "nav-item nav-link",
    loginLinkClass: "nav-item nav-link",
    signOutLinkClass: "nav-item nav-link"}
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    menuClass: "",
    ...deafulClasses
  });
  const HeaderStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height:'60px',
    background:'#A9D9FF',
    padding:'5px'
  }
  const addActiveCssOnClick = (e) =>{
  let temp =  e.target.parentElement.children
  for ( temp of temp) {
    temp.setAttribute('class','')
  }
  e.target.classList.toggle("active");

  if(e.target.textContent === 'Sign out') {
    window.localStorage.setItem('x-access-token','')
    alert("logged out...")
   // <Redirect to={{pathname: '/login'}}/>
   history.push('/login');
  }else if(e.target.textContent === 'Family Home') {
    history.push({
      pathname: '/userHome',
      state: {self:true,user_id:user_id}, 
    })
  }
  } 
  
  const [width, height] = useWindowSize();
  return (
    <div className='Home'>
    {(width > 990 && !['/','/login'].includes(currentPath))? <div className='customNav'>
    <div>{currentPath=='/test' && <FontAwesomeIcon icon={faAngleLeft} color="#17416B" size={'3x'} onClick={()=>{history.goBack()}}/>}</div> {['/ourFeature','/about','/register','/login','/','/addMemberself','/addRiskSelf'].includes(currentPath) ?
     <img style={{margin: '5px',height:'32px'}}src={Main_logo} alt="home Logo" /> :
      <Link
            to={loginUserId?'/userHome':"/"}
      >
           <img style={{margin: '5px',height:'32px'}}src={Main_logo} alt="home Logo" />
          </Link>}</div>
    :(['/test'].includes(currentPath) ? <div className='customNav'> <div> <FontAwesomeIcon icon={faAngleLeft} color="#17416B" size={'3x'} onClick={()=>{history.push({pathname:'/healthPlan',state:{user_id}})}}/></div> {['/ourFeature','/about','/register','/login','/','/addMemberself','/addRiskSelf'].includes(currentPath) ?
    <img style={{margin: '5px',height:'32px'}}src={Main_logo} alt="home Logo" /> :
     <Link
           to={loginUserId?'/userHome':"/"}
     >
          <img style={{margin: '5px',height:'32px'}}src={Main_logo} alt="home Logo" />
         </Link>}</div> : <Menubar state={state} setState={setState} deafulClasses={deafulClasses} />)}
  
  {/*above line modified by swap*/} 
  
   <div onClick={()=>{
      state.menu && setState({
        ...state,
        menu:false
      })
    }}></div>
    <div className={!['/','/login','/addMemberself'].includes(currentPath) && 'HomeContainer'} onClick={()=>{
      state.menu && setState({
        ...state,
        menu:false
      })
    }}>
    {width > 990 && !['/','/login','/addMemberself'].includes(currentPath) && <div className='leftPannel'>
    
    {/*<Link onClick={(e) =>addActiveCssOnClick(e)} to={loginUserId?'/userHome':"/"}> Family Home</Link>*/}
      <div onClick={(e) =>addActiveCssOnClick(e)}>Family Home</div> 
     {/* <div onClick={(e) =>{
        alert("working on it..")
        addActiveCssOnClick(e)}}>Share with Members</div>*/}
      <div onClick={(e) =>{
        alert("working on it..")
        addActiveCssOnClick(e)}}>Tutorial</div>
      <div onClick={(e) =>{
        window.open('https://www.hijeevan.com' , '_blank')
        addActiveCssOnClick(e)}}>HiJeevan</div>
      <div onClick={(e) =>{
        window.open('https://www.hijeevan.com/our-features' , '_blank')
        addActiveCssOnClick(e)}}>Our Feaures</div>
      <div onClick={(e) =>{
        window.open('https://www.hijeevan.com/about-us' , '_blank')
        addActiveCssOnClick(e)}}>About us</div>
      <div onClick={(e) =>{
         window.localStorage.setItem('x-access-token','')
        // alert("logged out...")
        history.push('/login');
        addActiveCssOnClick(e)}}>Sign out</div>
      
      <footer>
          <div className="contactText">contact@hijeevan.com</div>
          <div className="socialMediaContainer">
          <img src={linkedin} alt="linkedin Logo" />
          <img src={instagram} alt="instagram Logo" />
          <img src={facebook} alt="facebook Logo" />
          <img src={whatsapp} alt="whatsapp Logo" />
        </div>
          </footer>
    </div>}
    <div  className={width > 990 && !['/','/login'].includes(currentPath) && 'rightPannel'} >
    <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path='/addRisk' exact component={HealthStatusForm} name='HealthStatus'/>
        <Route path='/addRiskSelf' exact component={HealthStatusForm} name='HealthStatus'/>
        <Route path="/healthPlan" exact component={HealthPlan} />
        <Route path="/test" exact component={TestDetails} />
        <Route path='/userHome' exact component={UserHome} name='HealthStatus'/>
        <Route path='/addMember' exact component={AddMemberForm} name={`Let's Start`} />
        <Route path='/addMemberself' exact component={AddMemberForm} name={`Let's Start`} />
        <Route path="/myProfile" exact component={MyProfile} />
        <Route path="/userSetting" exact component={UserSetting} />
        <Route path="/shareWithMember" exact component={ShareWithMember} />
        <Route path="/createCheckup" exact component={CreateCheckupForm} />
        <Route path="/pdf" exact component={PdfViewer} />
        <Route path="/calender" exact component={CalenderDetails} />
        
        <Redirect to="/" />
      </Switch>
      </div>
     </div> 
    </div>
  );
}
export default Header
