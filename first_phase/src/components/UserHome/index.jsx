import { useContext,useEffect} from 'react';
import Man from '../../assets/profile/Man.svg'
import Add_member from '../../assets/Add_member.svg'
import Woman from '../../assets/profile/Woman.svg'
import './UserHome.css'
import { FieldDataContext } from '../../context/FieldData' 
import Profile from './Profile'

const UserHome =(props)=>{
  const {
    familyMembers,
    getFamilyMembers
    }=useContext(FieldDataContext)
    const clickHandler = ()=>{
      props.history.push({
        pathname: '/addMember',
        state: {self:false }
      })
    }
    useEffect(() => {
     getFamilyMembers()
    }, [])
    return (
      <div className='UserHome'>
        <div className='heading'>Welcome to your Family Home</div>
        <Profile profileIcon={Man} name={'name'} history={props.history}/>
        <div className='FamilyMemberContainer'>
          {familyMembers.map(member=>(<Profile key={member.name} profileIcon={Woman} name={member.name} />))}
          <img src={Add_member} alt="Add_member Logo" onClick={clickHandler}/>
        </div>
      </div>
    )
}
export default UserHome