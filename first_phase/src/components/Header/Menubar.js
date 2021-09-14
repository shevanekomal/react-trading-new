import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import linkedin from '../../assets/linkedin.svg'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'
import Main_logo from '../../assets/Main_logo.svg'
import { useLocation } from 'react-router-dom'
import './Menubar.css'
import { FieldDataContext } from '../../context/FieldData'
const Menubar = ({state,setState,deafulClasses}) =>{
  const {
    loginUserId
  } = useContext(FieldDataContext)
const currentPath = useLocation().pathname
const currentState = useLocation().state
 
  const toggleMenu = (event) => {
    event.stopPropagation();
    setState({
      ...state,
      menu: !state.menu
    });
  };
  const addActiveCssOnClick = (linkClass) =>setState({ ...state, ...deafulClasses,[linkClass]:'nav-item nav-link active', menu: false }) 
  
  const show = state.menu ? "show" : "";
  const getLabel=(currentPath)=>{
    switch(currentPath){
      case '/addMember': return currentState!=undefined && !currentState.self ? 'Add Member' :  `Let's Start`;
      case '/addRisk': return `Health Status`;
      default : return currentPath.toUpperCase().replace('/','')
    }
  }
  return (
    <nav className={['/ourFeature','/about','/register','/login','/'].includes(currentPath)?"navbar navbar-expand-lg navbar-light ":"navbar navbar-expand-lg navbar-light customNavBg" }>
    <button className="navbar-toggler hamberger" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon" />
      </button>
      {/* {['/ourFeature','/about'].includes(currentPath) ? (<><Link className="navbar-brand" to="/">
        logo
      </Link><button className="navbar-toggler registerButton" type="button">
        Register
      </button></>):<div style={{margin:'0 auto'}}><span>{getLabel(currentPath)}</span></div>
      } */}

     { !(currentState!=undefined && !currentState.self) && 

      <div style={{padding: '10px'}}className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
        <div className="navbar-toggler">
          <img style={{margin: '5px',height:'32px'}} src = {Main_logo}/>
        </div>
        
         {/* <Link
            className={state.homeLinkClass}
            to="/"
            onClick={() => addActiveCssOnClick('homeLinkClass')
            }
          >
            Home
          </Link>*/}
          <a className={state.homeLinkClass} onClick={() => addActiveCssOnClick('homeLinkClass')} href="https://www.hijeevan.com/" >
          Home
          </a>
         {/* <Link
            className={state.featureLinkClass}
            to="https://www.hijeevan.com/"
            onClick={() => addActiveCssOnClick('featureLinkClass')
            }
          >
           Our Features
          </Link> */}
          <a className={state.featureLinkClass} onClick={() => addActiveCssOnClick('featureLinkClass')} href="https://www.hijeevan.com/our-features" >
          Our Features
          </a>
         {/* <Link
            className={state.aboutLinkClass}
            to="/about"
            onClick={() => addActiveCssOnClick('aboutLinkClass')
            }
          >
            About Us
          </Link>*/}
          <a className={state.aboutLinkClass} onClick={() => addActiveCssOnClick('aboutLinkClass')} href="https://www.hijeevan.com/about-us" >
          About Us
          </a>
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
          <img className="linkedinLogo" src={linkedin} alt="linkedin Logo" />
          <img src={instagram} alt="instagram Logo" />
          <img src={facebook} alt="facebook Logo" />
          <img src={whatsapp} alt="whatsapp Logo" />
        </div>
          </footer>
        </div>

        
      </div>
    }
      <Link
            to={loginUserId?'/userHome':"/"}
          >
           <img style={{margin: '5px',height:'32px'}}src={Main_logo} alt="home Logo" />
          </Link>
    </nav>
  );
}
export default Menubar