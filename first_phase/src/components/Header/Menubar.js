import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import linkedin from '../../assets/linkedin.svg'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'
import Main_logo from '../../assets/Main_logo.svg'
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import './Menubar.css'
import { FieldDataContext } from '../../context/FieldData'
import {Alerts} from '../InputFields'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
//import Grid from '@material-ui/core/Grid';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Menubar = ({state,setState,deafulClasses}) =>{
  const {
   // loginUserId,
    user_id
  } = useContext(FieldDataContext)
const history = useHistory();
const currentPath = useLocation().pathname
const currentState = useLocation().state
const [open, setOpen] = useState(false);
  const toggleMenu = (event) => {
    event.stopPropagation();
    setState({
      ...state,
      menu: !state.menu
    });
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };
  const CustomizedTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#07213C',
      color: 'white',
      border: '1.29682px solid #07213C',
      borderradius: '2.66977px'
    },
  }))(Tooltip);
  
  const addActiveCssOnClick = (linkClass) =>{
    setState({ ...state, ...deafulClasses,[linkClass]:'nav-item nav-link active', menu: false }) 
    if(linkClass === 'signOutLinkClass') {
      window.localStorage.setItem('x-access-token','')
      window.localStorage.setItem('user_id','')
      window.localStorage.setItem('subuser_id','')
      setOpen(true)
     // alert("logged out...")
     // <Redirect to={{pathname: '/login'}}/>
     history.push('/login');
    }
  }
  const show = state.menu ? "show" : "";
  const getLabel=(currentPath)=>{
    
    switch(currentPath){
      case '/addMember': return currentState!=undefined && !currentState.self ? 'Add Member' :  `Let's Start`;
      case '/addRisk': return `Health Status`;
      case '/addRiskSelf': return `Health Status`;
      case '/healthPlan': return `Your Medical Checkups`;
      case '/test': return `Your Medical Checkups`;
      case '/userSetting': return `Settings`;
      case '/myProfile': return `Your Profile`;
      case '/calender': return `Calender`;
      case '/createCheckup': return `Create`;
      case '/knowYourself': return `Know Yourself`;
      case '/healthyHabitsResult': return `Your Healthy Habits`;
      case '/knowYourselfResult': return `Know Yourself`;
     // case '/login': return `Login`;
      //case '/': return `Register`;
     // default : return currentPath.toUpperCase().replace('/','')
    }
  }
  return (
    <nav className={['/ourFeature','/about','/','/login','/'].includes(currentPath)?"navbar navbar-expand-lg navbar-light ":"navbar navbar-expand-lg navbar-light customNavBg" }>
      { !(currentState!=undefined && ['/addMemberself','/addRiskSelf'].includes(currentPath) && currentState.self) ? 
<>
    <button className="navbar-toggler hamberger" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon" />
      </button>
      {/* {['/ourFeature','/about'].includes(currentPath) ? (<><Link className="navbar-brand" to="/">
        logo
      </Link><button className="navbar-toggler registerButton" type="button">
        Register
      </button></>):<div style={{margin:'0 auto'}}><span>{getLabel(currentPath)}</span></div>
      } */}
      <span className='pageHeader'>{getLabel(currentPath)}</span>
      <div style={{padding: '10px'}} className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
        <div className="navbar-toggler">
          <img style={{margin: '5px',height:'32px'}} src = {Main_logo}/>
        </div>
          {['/ourFeature','/about','/','/login','/'].includes(currentPath) ? (<>
          <a className={state.homeLinkClass} onClick={() => addActiveCssOnClick('homeLinkClass')} href="https://www.hijeevan.com/" >
          Home
          </a>
          <a className={state.featureLinkClass} onClick={() => addActiveCssOnClick('featureLinkClass')} href="https://www.hijeevan.com/our-features" >
          Our Features
          </a>
          <a className={state.aboutLinkClass} onClick={() => addActiveCssOnClick('aboutLinkClass')} href="https://www.hijeevan.com/about-us" >
          About Us
          </a>
          <Link
            className={state.resgisterLinkClass}
            to="/"
            onClick={()=>addActiveCssOnClick('resgisterLinkClass')}
          >
            Register
          </Link>
          <Link
            className={state.loginLinkClass}
            to="/login"
            onClick={()=>addActiveCssOnClick('loginLinkClass')}
          >
           Login
          </Link>
          </>):(
            <>
            <Link
            className={state.resgisterLinkClass}
            to="/userHome"
            state= {{self:true,user_id}}
            onClick={()=>addActiveCssOnClick('resgisterLinkClass')}
          > Family Home
          </Link>
        {/*   <Link
            className={state.resgisterLinkClass}
            to="/"
            onClick={() =>addActiveCssOnClick('resgisterLinkClass')}
          > Share with Members</Link> */}
       <Link
            className={state.loginLinkClass}
            to="/"
            onClick={()=>addActiveCssOnClick('loginLinkClass')}
          > Tutorial</Link>
          <a className={state.homeLinkClass} onClick={()=>addActiveCssOnClick('homeLinkClass')} href="https://www.hijeevan.com" target='_blank'>
         Hijeevan
          </a>
          <a className={state.featureLinkClass} onClick={ ()=>addActiveCssOnClick('featureLinkClass')} href="https://www.hijeevan.com/our-features" target='_blank'>
          Our Features
          </a>
          <a className={state.aboutLinkClass} onClick={()=>addActiveCssOnClick('aboutLinkClass')} href="https://www.hijeevan.com/about-us" target='_blank'>
          About Us
          </a>
          <a className={state.signOutLinkClass} onClick={() => addActiveCssOnClick('signOutLinkClass')} href="#" >
          Sign out
          </a>
          </>)}
          <footer>
          <div className="navbar-toggler socialMediaContainer">
          <div className="contactText">contact@hijeevan.com</div>
          
          <img style={{cursor: 'pointer'}} className="linkedinLogo" src={linkedin} alt="linkedin Logo"  onClick={(e) =>{
        window.open(' https://www.linkedin.com/company/preventenable' , '_blank')}}/>
          <img style={{cursor: 'pointer'}} src={instagram} alt="instagram Logo" onClick={(e) =>{
        window.open('https://www.instagram.com/hi.jeevan/' , '_blank')}} />
          <img style={{cursor: 'pointer'}} src={facebook} alt="facebook Logo" onClick={(e) =>{
        window.open('https://www.facebook.com/preventenable' , '_blank')}} />
          <img style={{cursor: 'pointer'}} src={whatsapp} alt="whatsapp Logo" onClick={(e) =>{
        window.open('https://wa.me/message/AJPD56WHMGCGJ1' , '_blank')}}/>

<div className="contactText" style = {{display:'flex'}}>Disclaimer
          <ClickAwayListener onClickAway={handleTooltipClose}>
          <span> <CustomizedTooltip title={`Disclaimer: Empower Digital Health (OPC) Pvt. Ltd. provides all information only for informational purposes. It is not a substitute for professional medical advice, care, diagnosis or treatment. It is recommended to consult your doctor/physician in any case of a doubt. All information is only for preventive health management. It is not applicable for individuals less than 18, pregnant women, or individuals undergoing any treatment. For any chronic existing conditions, please follow your doctor's plan.` } placement="bottom"   onClose={handleTooltipClose}
               open={tooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener><InfoIcon style={{width: '0.7em',
    height: '0.7em'}} className = "TooltipClass" onClick={handleTooltipOpen}/></CustomizedTooltip> </span>
                </ClickAwayListener>
              </div>
        </div>
        
          </footer>
          
        </div>

        { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="success" title="Success" content={'logged out...'} autoHideDuration = '6000'
           vertical= 'top' horizontal= 'center' />}
      </div>
      </> :<div></div>
    }
     {['/ourFeature','/about','/','/login','/','/addMemberself','/addRiskSelf'].includes(currentPath) ?
    
     <img style={{margin: '5px',height:'39px'}}src={Main_logo} alt="home Logo" /> :
      <Link
            to={(window.localStorage.getItem('user_id',''))?'/userHome':"/login"}
      >
           <img style={{margin: '5px',height:'39px'}}src={Main_logo} alt="home Logo" />
          </Link>}
    </nav>
    
  );
}
export default Menubar