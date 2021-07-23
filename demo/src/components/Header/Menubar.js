import { useState } from "react";
import { Link } from "react-router-dom";
import linkedin from '../../assets/linkedin.svg'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'
import './Menubar.css'
const Menubar = () =>{
  
const deafulClasses = {
  homeLinkClass: "nav-item nav-link",
  featureLinkClass: "nav-item nav-link",
  aboutLinkClass: "nav-item nav-link",
  resgisterLinkClass: "nav-item nav-link",
  loginLinkClass: "nav-item nav-link",}
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    menuClass: "",
    ...deafulClasses
  });
  const toggleMenu = (event) => {
    event.stopPropagation();
    setState({
      ...state,
      menu: !state.menu
    });
  };
  const addActiveCssOnClick = (linkClass) =>setState({ ...state, ...deafulClasses,[linkClass]:'nav-item nav-link active', menu: false }) 
  
  const toggleOpen = () => setState({ ...state, isOpen: !state.isOpen });

  const show = state.menu ? "show" : "";
  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler hamberger" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon" />
      </button>
      <Link className="navbar-brand" to="/">
        logo
      </Link>
      
      {!(state.resgisterLinkClass == 'nav-item nav-link active' || state.loginLinkClass=='nav-item nav-link active') && <button className="navbar-toggler registerButton" type="button">
        Register
      </button>
      }
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
        <div className="navbar-toggler">
          Logo
        </div>
          <Link
            className={state.homeLinkClass}
            to="/"
            onClick={() => addActiveCssOnClick('homeLinkClass')
            }
          >
            Home
          </Link>
          <Link
            className={state.featureLinkClass}
            to="/ourFeature"
            onClick={() => addActiveCssOnClick('featureLinkClass')
            }
          >
           Our Features
          </Link>
          <Link
            className={state.aboutLinkClass}
            to="/about"
            onClick={() => addActiveCssOnClick('aboutLinkClass')
            }
          >
            About Us
          </Link>
          <Link
            className={state.resgisterLinkClass}
            to="/register"
            onClick={() =>addActiveCssOnClick('resgisterLinkClass')}
          >
            Register
          </Link>
          <Link
            className={state.loginLinkClass}
            to="/login"
            onClick={() =>addActiveCssOnClick('loginLinkClass')}
          >
           Login
          </Link>
          <footer>
          <div className="navbar-toggler socialMediaContainer">
          <img src={linkedin} alt="linkedin Logo" />
          <img src={instagram} alt="instagram Logo" />
          <img src={facebook} alt="facebook Logo" />
          <img src={whatsapp} alt="whatsapp Logo" />
        </div>
          </footer>
        </div>

        
      </div>
    </nav>
  );
}
export default Menubar