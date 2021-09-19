import {Buttons,CheckboxesGroup} from '../InputFields'
import ModalWindow from '../Modal/ModalWindow'
import { useState,useContext } from 'react';
import { FieldDataContext } from '../../context/FieldData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Man from '../../assets/profile/Man.svg'
import Woman from '../../assets/profile/Woman.svg'
import OldMan from '../../assets/profile/Old-man.svg'
import OldWoman from '../../assets/profile/Old-woman.svg'
import Girl from '../../assets/profile/Girl.svg'
import Boy from '../../assets/profile/Boy.svg'
import './UserSetting.css'

const UserSetting =(props)=>{
  let self = true;
  const [state,setState] = useState({
    health_checkup:{
      value:'',
      error:''
      },
      health_advice:{
      value:'',
      error:''
    },
    family_member_notification:{
      value:'',
      error:''
    },

})
  const [open, setOpen] = useState(false);
  const [saveOpen, setOpenSave] = useState(false);
  
  const {
    deleteMemberProfile,
    getHealthStatusDetails,
    userHealthDetails,
    user_id
  } = useContext(FieldDataContext)
  const handleChange =(e) =>{
    let value =  e.target.value;
    let error = ''
    setState({
      ...state,
      [e.target.name]:{
        value,
        error:error
      }
      })
  }
  const saveSettingsHandler = (e) =>{
    e.preventDefault()
    setOpenSave(true)
   }
   const deleteProfileHandler = (e) =>{
      e.preventDefault()
        //show pop for confirm delete.
        setOpen(true)
        
    }
    const healthStatusClickHandler = (e,user_id) =>{
     let name = e.target.name;
     getHealthStatusDetails(user_id).then(result=>{
      //here in backend the user_id is of main user
      
    if(result.status){
     // console.log(result)
      props.history.push({
            pathname: '/addRisk',
            state: {self,user_id:user_id,userHealthDetails:result.data}, // added by swap - here main user id needed
     //Please note result.data should be same as the below format
    //      {
    //       gender:'male',
    // birthdate:'06/04/1996',
    // height:"5'5",
    // weight:'55',
    // diet:'Vegetarian',
    // alcoholIntake:'Yes',
    // smoking:'0',
    // exercise:'Less than 30 minutes',
    // diagnosedCondition:['None of the below'],
    // familyHistoryConditions:['Cancer - Breast']
    //     }
  })
    } 
    })     
    }
    const handleClick = (e)=>{
      console.log(e.target)
       if(e.target.innerText === 'DELETE'){
            setOpen(false) 
            deleteMemberProfile(props.location.state.user_id).then(result=>{
              //here in backend the user_id is of main user
            if(result.status){
              props.history.push({
                    pathname: '/userHome',
                    state: {self,user_id:user_id}, // added by swap - here main user id needed
              })
            } 
          })
       }else if(e.target.innerText === 'NO'){
          setOpen(false) 
          setOpenSave(false)
          props.history.push({
            pathname: '/userHome',
            state: {self,user_id:user_id}, // added by swap - here main user id needed
        })
       }else if(e.target.innerText === 'YES'){
        setOpenSave(false) 
       }
    
      }
      return(
        <div  className="settingContainer">
          
        { (<form >
          <div>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:'70px'}}><Buttons onClick={(e)=>saveSettingsHandler(e)} bgColor={'#F9E24D'} >Save Changes</Buttons></div>
          <div className="settingHeader">
          {props.location.state.relation === 'Me' ?(<img src={ props.location.state.gender==='male'?(Man):(Woman)} alt="Logo"/>):
          <img src={(props.location.state.relation === 'father' || props.location.state.relation==='mother') ?(props.location.state.relation === 'father' ? (OldMan):(OldWoman))
          :(props.location.state.relation==='brother' || props.location.state.relation==='husband'?(Man):((props.location.state.relation==='son')?(Boy):props.location.state.relation==='daughter')?(Girl):(Woman))} alt="Logo"/>}
         </div>
          <br/>
           {/*  
            <label>name</label>
            <label>{props.location.state.name} </label>
            <br/>
            <hr></hr>
            <label>Mobile</label>
            <label>{props.location.state.mobile} </label>
            <br/>
            <hr></hr>
            {props.location.state.relation === 'Me' && <label>Relation</label> &&
            <label>{props.location.state.relation} </label> && <br/>
            && <hr/> }*/}
            <table className='settingPersonalDetails'><tbody>
              <tr>
                <td>Name</td>
                <td>{props.location.state.name}</td>
              </tr>
             
              <tr>
                <td>Mobile</td>
                <td>{props.location.state.mobile}</td>
              </tr>
              <tr>
                <td>Relation</td>
                <td>{props.location.state.relation}</td>
              </tr>
              </tbody>

              </table>
              <table className='settingOtherDetails'><tbody>
            <tr key='Health Status' name='Health Status' onClick={(e)=>healthStatusClickHandler(e,props.location.state.user_id)} > 
            <td name='Health Status'>Health Status</td>
            <td><FontAwesomeIcon  name='Health Status' icon={faAngleRight} color="#17416B" size={'lg'} /></td>
            </tr>
            <tr key='Health Checkups' onClick={(e)=>healthStatusClickHandler(e,props.location.state.user_id)} > 
            <td>Health Checkups</td>
            <td> <CheckboxesGroup withoutLable={true} name='Health Checkups' onChange={handleChange} options={[ {text:'yes',value:''}]}  /> </td>
            </tr>
            <tr key='Health advice and assessment' onClick={(e)=>healthStatusClickHandler(e,props.location.state.user_id)} > 
            <td>Health advice and assessment</td>
            <td> <CheckboxesGroup withoutLable={true} name='Health advice and assessment' onChange={handleChange} options={[ {text:'yes',value:''}]}  /></td>
            </tr>
            </tbody>
          </table>
         
            { open && 
          <ModalWindow open={open}  handleOpen={()=>setOpen(true)} handleClose ={()=>setOpen(false)} handleClick={(e)=> handleClick(e)} option2buttonColor='#BC433B' option1buttonColor='#07213C' option1='NO' option2 = 'DELETE'> <p><b>Are you sure you want to delete this profile?</b></p>
          <p>You won’t be able to recover the data associated with this profile once you delete it.</p></ModalWindow>}
          { saveOpen && 
           <ModalWindow open={saveOpen}  handleOpen={()=>setOpenSave(true)} handleClose ={()=>setOpenSave(false)} handleClick={handleClick} option1='NO' option1buttonColor='#07213C' option2bgColor='#F9E24D' option2 = 'YES'> <p><b>Do you want to save your changes?</b></p>
          </ModalWindow> }
          <div style={{display:'flex'}}>
          
            {props.location.state.relation !== 'Me' &&  <Buttons buttonColor='#BC433B' onClick={(e)=>deleteProfileHandler(e)} >Delete profile</Buttons>}
           
          </div>
            
            </div>
          </form>) }
        </div>
    )
}

export default UserSetting