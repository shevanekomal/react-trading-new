import { BrowserRouter as Router, Switch, Route, Redirect,useLocation } from "react-router-dom";
import { useState } from "react";
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
import Main_logo from '../../assets/Main_logo.svg'
import {useWindowSize} from '../../utility'
import linkedin from '../../assets/linkedin.svg'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'

const Header = () => {
  const currentPath = useLocation().pathname
  const deafulClasses = {
    homeLinkClass: "nav-item nav-link",
    featureLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    resgisterLinkClass: "nav-item nav-link",
    loginLinkClass: "nav-item nav-link"}
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
  } 
  
  const [width, height] = useWindowSize();
  return (
    <div className='Home'>
    {(width > 990 && !['/','/login'].includes(currentPath))? <div className='customNav'></div>:<Menubar state={state} setState={setState} deafulClasses={deafulClasses} />}
    <div onClick={()=>{
      state.menu && setState({
        ...state,
        menu:false
      })
    }}></div>
    <div className='HomeContainer' onClick={()=>{
      state.menu && setState({
        ...state,
        menu:false
      })
    }}>
    {width > 990 && !['/','/login'].includes(currentPath) && <div className='leftPannel'>
    
      <div onClick={(e) =>addActiveCssOnClick(e)}>Family Home</div>
      <div onClick={(e) =>addActiveCssOnClick(e)}>Share with Members</div>
      <div onClick={(e) =>addActiveCssOnClick(e)}>Tutorial</div>
      <div onClick={(e) =>addActiveCssOnClick(e)}>HiJeevan</div>
      <div onClick={(e) =>addActiveCssOnClick(e)}>Our Feaures</div>
      <div onClick={(e) =>addActiveCssOnClick(e)}>About us</div>
      <div onClick={(e) =>addActiveCssOnClick(e)}>Sign out</div>
      <footer>
          <div className="socialMediaContainer">
          <img src={linkedin} alt="linkedin Logo" />
          <img src={instagram} alt="instagram Logo" />
          <img src={facebook} alt="facebook Logo" />
          <img src={whatsapp} alt="whatsapp Logo" />
        </div>
          </footer>
    </div>}
    <div>
    <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path='/addRisk' exact component={HealthStatusForm} name='HealthStatus'/>
        <Route path="/healthPlan" exact component={HealthPlan} />
        <Route path="/test" exact component={TestDetails} />
        <Route path='/userHome' exact component={UserHome} name='HealthStatus'/>
        <Route path='/addMember' exact component={AddMemberForm} name={`Let's Start`} />
        <Route path="/myProfile" exact component={MyProfile} />
        <Route path="/userSetting" exact component={UserSetting} />
        <Route path="/shareWithMember" exact component={ShareWithMember} />
        <Route path="/createCheckup" exact component={CreateCheckupForm} />
        <Redirect to="/" />
      </Switch>
      </div>
     </div> 
    </div>
  );
}
export default Header
