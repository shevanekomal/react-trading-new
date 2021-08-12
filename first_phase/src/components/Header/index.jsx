import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HealthPlan from "../HealthPlan";
import HealthStatusForm from '../HealthStatusForm'
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
    <div style={{height:'40px',background:'#A9D9FF'}}></div>
    <div onClick={()=>{
      state.menu && setState({
        ...state,
        menu:false
      })
    }}>
    <Switch>
        <Route path="/" exact component={HealthStatusForm} />
        <Route path='/addRisk' exact component={HealthStatusForm} name='HealthStatus'/>
        <Route path="/healthPlan" exact component={HealthPlan} />
        <Route path="/test" exact component={TestDetails} />
        <Redirect to="/" />
      </Switch>
     </div> 
    </Router>
    </div>
  );
}
export default Header
