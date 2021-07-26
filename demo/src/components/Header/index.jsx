import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../Home'
import Features from '../Features'
import Aboutus from '../Aboutus'
import Register from '../Register'
import Login from '../Login'
import Menubar from "./Menubar";
import AddDetails from '../AddDetails'
import HealthPlan from "../HealthPlan";
import AddForm from '../AddForm/AddForm'
import UserHome from '../UserHome'
const Header = () => {
  return (
    <div className='Home'>
    <Router>
    <Menubar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ourFeature" exact component={Features} />
        <Route path="/about" exact component={HealthPlan} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path='/addMember' exact component={AddDetails} name={`Let's Start`} />
        <Route path='/addRisk' exact component={AddForm} name='HealthStatus'/>
        <Route path='/userHome' exact component={UserHome} name='HealthStatus'/>
        <Route component={(<h1>Not Found 404</h1>)} />
      </Switch>
    </Router>
    </div>
  );
}
export default Header
