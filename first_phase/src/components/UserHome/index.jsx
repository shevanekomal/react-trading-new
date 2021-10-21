import { useContext, useState, useEffect, Suspense, lazy} from 'react';
import { FieldDataContext } from '../../context/FieldData' 
import './UserHome.css'
import {Alerts} from '../InputFields'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Boy = lazy(() => import('../../assets/profile/Boy.svg'));
const Man = lazy(() => import('../../assets/profile/Man.svg'));
const Add_member = lazy(() => import('../../assets/Add_member.svg'));
const Woman = lazy(() => import('../../assets/profile/Woman.svg'));
const OldMan = lazy(() => import('../../assets/profile/Old-man.svg'));
const OldWoman = lazy(() => import('../../assets/profile/Old-woman.svg'));
const Girl = lazy(() => import('../../assets/profile/Girl.svg'));
const Profile = lazy(() => import('./Profile'));

const UserHome =(props)=>{
  let alertMsg = '';
  const [open, setOpen] = useState(false);

  const {
    familyMembers,
    getFamilyMembers,
    //user_id
    }=useContext(FieldDataContext)
    const clickHandler = ()=>{
      if(familyMembers.length >= 6){
        alertMsg = 'You can add maximum 6 members only.'
        setOpen(true);
      }else{
        props.history.push({
          pathname: '/addMember',
         // state: {self:false,user_id :user_id}
         state: {self:false,user_id :window.localStorage.getItem('user_id')}
        })
      }
     
    }
     useEffect(() => {
      getFamilyMembers(window.localStorage.getItem('user_id')).then(result=>{
       if(!result){   
         props.history.push('/login')
       }
       });
     }, [])
    return (
      <div className='UserHome'>
        <div className='heading'>Welcome to your Family Home</div>
      { /* <Profile profileIcon={Man} name={'name'} history={props.history}/> */}
      {familyMembers.map(member=>(member.user_type ==='user'?(<Suspense fallback={<div>Loading...</div>}>
        <Profile key={member.name} profileIcon={member.gender==='male'?(member.age < 26? (Boy) :(member.age >60?(OldMan):Man)):(member.age < 26? (Girl) :(member.age >60?(OldWoman):Woman))} name={member.name} history={props.history} user_id={member.user_id} relation={member.relation} mobile={member.mobile} gender={member.gender} user_type = {member.user_type}/>
      </Suspense>):''))}
        <div className='FamilyMemberContainer'>
          {familyMembers.map(member=>(member.user_type ==='subUser'?(member.relation==='father' || member.relation==='mother' )?(<Profile key={member.name} profileIcon={member.relation==='father' ?(OldMan):(OldWoman)} name={member.name} history={props.history} user_id={member.user_id} relation={member.relation} mobile={member.mobile}  user_type = {member.user_type} />): 
          (<Suspense fallback={<div>Loading...</div>}><Profile key={member.name} profileIcon={(member.relation==='brother' || member.relation==='husband')?(Man):((member.relation==='son')?(Boy):(member.relation==='daughter')?(Girl):(Woman))} name={member.name} history={props.history} user_id={member.user_id} relation={member.relation} mobile={member.mobile}  user_type = {member.user_type} /></Suspense>):''))}
          <div className='AddMemberLogo'>
          <LazyLoadImage
          style={{cursor: 'pointer'}} 
          src={Add_member} 
          alt="Add_member Logo" 
          onClick={clickHandler}
         />
          </div>
          { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="error" title="Error" content={'You can add maximum 5 family members only'} autoHideDuration = '10000'
           vertical= 'top' horizontal= 'center' />}
        </div>
       
      </div>
    )
}
export default UserHome