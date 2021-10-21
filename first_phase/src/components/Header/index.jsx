import { BrowserRouter as Switch, Route, Redirect,useLocation,Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState,useContext, Suspense, lazy } from "react";
import { FieldDataContext } from '../../context/FieldData'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./Menubar";
import {useWindowSize} from '../../utility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import {Alerts} from '../InputFields'
import {InfoIcon,} from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const HealthPlan = lazy(() => import('../HealthPlan'));
const HealthStatusForm = lazy(() => import('../HealthStatusForm'));
const TestDetails = lazy(() => import('../TestDetails'));
const Login = lazy(() => import('../Login'));
const Register = lazy(() => import('../Register'));
const MyProfile = lazy(() => import('../MyProfile'));
const AddMemberForm = lazy(() => import('../AddMemberForm'));
const UserSetting = lazy(() => import('../UserSetting'));
const ShareWithMember = lazy(() => import('../ShareWithMember'));
const CreateCheckupForm = lazy(() => import('../CreateCheckupForm'));
const CalenderDetails = lazy(() => import('../CalenderDetails'));
const PdfViewer = lazy(() => import('../PdfViewer'));
const KnowYourSelfForm = lazy(() => import('../KnowYourSelfForm'));
const knowYourselfResult = lazy(() => import('../KnowYourSelfResult'));
const HealthyHabitsResult = lazy(() => import('../HealthyHabitsResult'));
const GridListView = lazy(() => import('../GridListView'));
const UserHome = lazy(() => import('../UserHome'));

const whatsapp = lazy(() => import('../../assets/whatsapp.svg'));
const linkedin = lazy(() => import('../../assets/linkedin.svg'));
const Main_logo = lazy(() => import('../../assets/Main_logo.svg'));
const instagram = lazy(() => import('../../assets/instagram.svg'));
const facebook = lazy(() => import('../../assets/facebook.svg'));
const MainLogo = <img
style={{margin: '5px',height:'32px'}}
src={Main_logo} 
alt="home Logo"
  />
const Header = () => {
  const {
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
  const [open, setOpen] = useState(false);
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

  const addActiveCssOnClick = (e) =>{
  let temp =  e.target.parentElement.children
  for ( temp of temp) {
    temp.setAttribute('class','')
  }
  e.target.classList.toggle("active");

  if(e.target.textContent === 'Sign out') {
    window.localStorage.setItem('x-access-token','')
    window.localStorage.setItem('user_id','')
    window.localStorage.setItem('subuser_id','')
   setOpen(true)
   history.push('/login');
  }else if(e.target.textContent === 'Family Home') {
    history.push({
      pathname: '/userHome',
      state: {self:true,user_id:user_id}, 
    })
  }
  } 

  const redirectToHealthPlan = (e) => { 
    console.log(e.target.baseURI)
   e.preventDefault();
   console.log(history)
  if(e.target.baseURI.includes('/test')){
    let user_id1 = window.localStorage.getItem('subuser_id')
    history.push({
      pathname:'/healthPlan',
      state:{user_id :user_id1}
    })
  }else if(e.target.baseURI.includes('/healthPlan')){
    history.push('/myProfile')
  }else {
    history.goBack()
    
  }
   
  };
  const [width, height] = useWindowSize();
  /*const getLabel=(currentPath)=>{
    
    switch(currentPath){
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
    }
  }*/
  return (
    <div className='Home'>
      <div>
    {/*<TestDetails parentCallback = {handleCallback}/>
    <TestDetails props={props} sendDataToParent={sendDataToParent} />*/}
    </div>
    {(width > 990 && !['/','/login'].includes(currentPath))? <div className='customNav'>
    <div>{['/test','/addRisk','/myProfile','/userSetting','/healthPlan','/calender','/createCheckup','/gridListView','/healthyHabitsResult','/pdf','/knowYourselfResult','/knowYourself','/addMember'].includes(currentPath) && <FontAwesomeIcon style={{marginLeft:'25px'}} icon={faAngleLeft} color="#17416B" size={'3x'} onClick={(e)=>redirectToHealthPlan(e)}/>}</div> {['/ourFeature','/about','/register','/login','/','/addMemberself','/addRiskSelf'].includes(currentPath) ?
    <img
      style={{margin: '5px',height:'39px'}}
      src={Main_logo}
      alt="home Logo"
       /> :
      <Link
            to={(window.localStorage.getItem('user_id',''))?'/userHome':"/login"}
      >
           <MainLogo />
          </Link>}</div>
    :(['/test'].includes(currentPath) ? <div className='customNav'> <div>  <FontAwesomeIcon style={{marginLeft:'10px'}} icon={faAngleLeft} color="#17416B" size={'3x'} onClick={(e)=>redirectToHealthPlan(e)}/></div> {['/ourFeature','/about','/','/login','/','/addMemberself','/addRiskSelf'].includes(currentPath) ?
    <MainLogo />:
          <Link
           to={(window.localStorage.getItem('user_id',''))?'/userHome':"/login"}
     >
      <MainLogo />
    </Link>}</div> : <Menubar state={state} setState={setState} deafulClasses={deafulClasses} />)}
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
    <div onClick={(e) =>history.push({
      pathname: '/userHome',
      state: {self:true,user_id:user_id}, 
    })}>Family Home</div> 
   {/*  <div 
      //onClick={(e) =>addActiveCssOnClick(e)}
   >Family Home</div> */}
     {/* <div onClick={(e) =>{
        alert("working on it..")
        addActiveCssOnClick(e)}}>Share with Members</div>*/}
      <div onClick={(e) =>{
        alert("working on it..")
        //addActiveCssOnClick(e)
        }}
        >Tutorial</div>
      <div onClick={(e) =>{
        window.open('https://www.hijeevan.com' , '_blank')
       // addActiveCssOnClick(e)
       }}>HiJeevan</div>
      <div onClick={(e) =>{
        window.open('https://www.hijeevan.com/our-features' , '_blank')
       // addActiveCssOnClick(e)
       }}>Our Feaures</div>
      <div onClick={(e) =>{
        window.open('https://www.hijeevan.com/about-us' , '_blank')
        addActiveCssOnClick(e)}}>About us</div>
      <div onClick={(e) =>{
         window.localStorage.setItem('x-access-token','')
         window.localStorage.setItem('user_id','')
         window.localStorage.setItem('subuser_id','')
        // alert("logged out...")
        setOpen(true)
        history.push('/login');
        //addActiveCssOnClick(e)
        }}>Sign out</div>
      
      <footer>
          <div className="contactText">contact@hijeevan.com</div>
          <div className="socialMediaContainer">
          <img
            style={{cursor: 'pointer'}} 
            src={linkedin} alt="linkedin Logo" 
            onClick={(e) =>window.open(' https://www.linkedin.com/company/preventenable' , '_blank')}
          />
        <img
          style={{cursor: 'pointer'}} 
          src={instagram} alt="instagram Logo" 
          onClick={(e) => window.open('https://www.instagram.com/hi.jeevan/' , '_blank')}
        />
        <img
           style={{cursor: 'pointer'}} 
           src={facebook} 
           alt="facebook Logo" 
           onClick={() =>window.open('https://www.facebook.com/preventenable' , '_blank')}
        />
        <img
          style={{cursor: 'pointer'}} 
          src={whatsapp} alt="whatsapp Logo" 
          onClick={() => window.open('https://wa.me/message/AJPD56WHMGCGJ1' , '_blank')}
         />

        </div>
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
          </footer>
    </div>}
    <div  className={width > 990 && !['/','/login'].includes(currentPath) && 'rightPannel'} >
    
    <Suspense fallback={<div>Loading...</div>}>
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
        <Route path="/createCheckup" exact component={CreateCheckupForm} />
        <Route path="/pdf" exact component={PdfViewer} />
        <Route path="/calender" exact component={CalenderDetails} />
        <Route path="/knowYourself" exact component={KnowYourSelfForm} />
        <Route path="/knowYourselfResult" exact component={knowYourselfResult} />
        <Route path="/healthyHabitsResult" exact component={HealthyHabitsResult} />
        <Route path="/gridListView" exact component={GridListView} />
        <Redirect to="/" />
      </Switch>
      </Suspense>
      </div>
      { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="success" title="Success" content={'logged out...'} autoHideDuration = '6000'
           vertical= 'top' horizontal= 'center' />}
     </div> 
    </div>
  );
}
export default Header
