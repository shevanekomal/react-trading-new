import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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


const Header = () => {
  return (
    <div className='Home'>
    <Router>
    <Menubar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ourFeature" exact component={Features} />
        <Route path="/about" exact component={Aboutus} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path='/addMember' exact component={AddMemberForm} name={`Let's Start`} />
        <Route path='/addRisk' exact component={HealthStatusForm} name='HealthStatus'/>
        <Route path='/userHome' exact component={UserHome} name='HealthStatus'/>
        <Route path="/healthPlan" exact component={HealthPlan} />
        <Route path="/myProfile" exact component={MyProfile} />
        
        <Route component={(<h1>Not Found 404</h1>)} />
      </Switch>
    </Router>
    </div>
  );
}
export default Header
