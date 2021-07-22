import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../Home'
import Features from '../Features'
import Aboutus from '../Aboutus'
import Register from '../Register'
import Login from '../Login'
import Menubar from "./Menubar";

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
        <Route component={NotFound} />
      </Switch>
    </Router>
    </div>
  );
}

function NotFound() {
  return <h1>Not Found 404</h1>;
}
function SubMenu1() {
  return <h2>Sub Menu1</h2>;
}
function SubMenu2() {
  return <h2>Sub Menu2</h2>;
}
export default Header
