import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HealthPlan from "../HealthPlan";
import HealthStatusForm from '../HealthStatusForm'
import TestDetails from '../TestDetails'
import Main_logo from '../../assets/Main_logo.svg'
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
  const HeaderStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height:'60px',
    background:'#A9D9FF',
    padding:'5px'
  }
  return (
    <div className='Home'>
    <Router>
    <div style={HeaderStyle}><img width='100&' height='100%' src={Main_logo} /></div>
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
