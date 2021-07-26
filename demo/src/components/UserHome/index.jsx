import { useContext } from 'react';
import Man from '../../assets/Man.svg'
import Add_member from '../../assets/Add_member.svg'
import Woman from '../../assets/Woman.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import './UserHome.css'
import { FieldDataContext } from '../../context/FieldData' 


const UserHome =()=>{
  const {
    familyMembers
    }=useContext(FieldDataContext)
    return (
      <div className='UserHome'>
        <div className='heading'>Welcome to your Family Home</div>
        <div className='Profile self'>
          <img src={Man} alt="Man Logo" />
            <div><FontAwesomeIcon icon={faEllipsisV}/></div>
        </div>
        <div style={{textAlign:"center"}}>Name</div>

        <div style={{display:'flex'}}>{familyMembers.map(member=>(<>
        <div className='Profile'>
          <img src={Woman} alt="Man Logo" />
            <div><FontAwesomeIcon icon={faEllipsisV}/></div>
        </div>
        <div style={{textAlign:"center"}}>{member.name}</div>
        </>))}<img src={Add_member} alt="Add_member Logo" /></div>
        
        
        
      </div>
    )
}

export default UserHome