import { useContext,useEffect} from 'react';
import Man from '../../assets/profile/Man.svg'
import Add_member from '../../assets/Add_member.svg'
import Woman from '../../assets/profile/Woman.svg'
import OldMan from '../../assets/profile/Old-man.svg'
import OldWoman from '../../assets/profile/Old-woman.svg'
import Girl from '../../assets/profile/Girl.svg'
import Boy from '../../assets/profile/Boy.svg'
import './UserHome.css'
import { FieldDataContext } from '../../context/FieldData' 
import Profile from './Profile'
import {Alerts} from '../InputFields'
import {useState} from 'react'

const UserHome =(props)=>{
  let alertMsg = '';
  const [open, setOpen] = useState(false);

  const {
    familyMembers,
    getFamilyMembers,
    user_id
    }=useContext(FieldDataContext)
    const clickHandler = ()=>{
      if(familyMembers.length >= 6){
        alertMsg = 'You can add maximum 6 members only.'
        setOpen(true);
      }else{
        props.history.push({
          pathname: '/addMember',
          state: {self:false,user_id :user_id}
        })
      }
     
    }
    useEffect(() => {
     getFamilyMembers()
    }, [])
    return (
      <div className='UserHome'>
        <div className='heading'>Welcome to your Family Home</div>
      { /* <Profile profileIcon={Man} name={'name'} history={props.history}/> */}
      {familyMembers.map(member=>(member.user_type ==='user'?(<Profile key={member.name} profileIcon={member.gender==='male'?(Man):(Woman)} name={member.name} history={props.history} user_id={member.user_id} relation={member.relation} mobile={member.mobile} gender={member.gender} />):''))}
        <div className='FamilyMemberContainer'>
          {familyMembers.map(member=>(member.user_type ==='subUser'?(member.relation==='father' || member.relation==='mother' )?(<Profile key={member.name} profileIcon={member.relation==='father' ?(OldMan):(OldWoman)} name={member.name} history={props.history} user_id={member.user_id} relation={member.relation} mobile={member.mobile}  user_type = {member.user_type} />): 
          (<Profile key={member.name} profileIcon={(member.relation==='brother' || member.relation==='husband')?(Man):((member.relation==='son')?(Boy):(member.relation==='daughter')?(Girl):(Woman))} name={member.name} history={props.history} user_id={member.user_id} relation={member.relation} mobile={member.mobile}  user_type = {member.user_type} />):''))}
          <div className='AddMemberLogo'>
          <img src={Add_member} alt="Add_member Logo" onClick={clickHandler}/>
          </div>
          { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="error" title="Error" content={'You can add maximum 6 members only'} 
           vertical= 'top' horizontal= 'center' />}
        </div>
       
      </div>
    )
}
export default UserHome