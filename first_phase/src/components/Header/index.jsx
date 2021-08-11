import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../Home'
import Features from '../Features'
import Aboutus from '../Aboutus'
import Register from '../Register'
import Login from '../Login'
import Menubar from "./Menubar";
import AddMemberForm from '../AddMemberForm'
import HealthPlan from "../HealthPlan";
import HealthStatusForm from '../HealthStatusForm'
import UserHome from '../UserHome'
import MyProfile from '../MyProfile'
import TestDetails from '../TestDetails'


const Header = () => {
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
  return (
    <div className='Home'>
    <Router>
    {/* <Menubar state={state} setState={setState} deafulClasses={deafulClasses} /> */}
    <div style={{height:'40px',background:'#A9D9FF'}}></div>
    <div onClick={()=>{
      state.menu && setState({
        ...state,
        menu:false
      })
    }}>
    <Switch>
        <Route path="/" exact component={HealthStatusForm} />
        <Route path="/ourFeature" exact component={Features} />
        <Route path="/about" exact component={Aboutus} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path='/addMember' exact component={AddMemberForm} name={`Let's Start`} />
        <Route path='/addRisk' exact component={HealthStatusForm} name='HealthStatus'/>
        <Route path='/userHome' exact component={UserHome} name='HealthStatus'/>
        <Route path="/healthPlan" exact component={HealthPlan} />
        <Route path="/myProfile" exact component={MyProfile} />
        <Route path="/test" exact component={TestDetails} />
        <Redirect to="/" />
      </Switch>
     </div> 
    </Router>
    </div>
  );
}
export default Header
