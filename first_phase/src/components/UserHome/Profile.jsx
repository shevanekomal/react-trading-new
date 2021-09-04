import './UserHome.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import {Button,Menu,MenuItem} from '@material-ui/core';

const Profile = ({profileIcon,name,history,user_id,relation,mobile,gender}) =>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const clickHandler = ()=>{
    
    history.push({
      pathname: '/userSetting',
     state: {user_id:user_id,name:name,relation:relation,mobile:mobile,gender:gender}
    })
    //history.push("/myProfile")
  }
    return (
      <div >
        <div className='Profile'>
          <img src={profileIcon} alt="Logo" onClick={clickHandler}/>
          <div className='ButtonContainer'>
            <div>+9</div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <FontAwesomeIcon icon={faEllipsisV}/>
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Open</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
            </Menu>
        </div>
      </div>
      <div  className='NameHolder'>{name}</div>
    </div>
    )
  }
export default Profile