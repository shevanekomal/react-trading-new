import './UserHome.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import {Button,Menu,MenuItem} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const Profile = ({profileIcon,name,history,user_id,user_type,relation,mobile,gender}) =>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSettings = () => {
    history.push({
      pathname: '/userSetting',
     state: {user_id:user_id,name:name,relation:relation,mobile:mobile,gender:gender}
    })
  };
  const clickHandler = ()=>{
    
    /*history.push({
      pathname: '/userSetting',
     state: {user_id:user_id,name:name,relation:relation,mobile:mobile,gender:gender}
    })*/
    history.push({
    pathname:"/myProfile",
    state:{user_id:user_id}
    })
  }
    return (
      <div className={user_type === 'subUser' ? 'ProfileContainer ' : 'ProfileContainer MainUser' }>
      <div className='Profile'>
      <table>
        <tr> 
          <td colspan="2"><img src={profileIcon} alt="Logo" onClick={clickHandler}/></td>
          {/* <div className='ProfileButtonContainer'>
            <div>+9</div>
            </div> */}
          </tr>
        <tr><td className='NameHolder'>{name}</td><td>  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <FontAwesomeIcon icon={faEllipsisV}/>
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={clickHandler}>Open</MenuItem>
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
            </Menu></td></tr>
      </table>
      </div>
    </div>
    )
  }
export default Profile