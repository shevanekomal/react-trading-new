import React,{ useState } from 'react'
import { useHistory } from "react-router-dom";
import {Alerts} from '../InputFields'

const UpdatePanelStrip=(props) =>{
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const {header,subHeader,tag,actionPath,self,list,name,user_id} = props
  
  return (<div className='UpdateContainer' onClick={()=>{
   
    if(name === 'Medical Checkups' || name === 'Physical Wellbeing'){
    //  console.log(list)
     if(list.includes('healthStatus')){
       alert('Please update your health status form first')
     // setOpen(true)
     }else
      actionPath.map((path) => {path !== false &&  history.push({
        pathname: path,
        state: {user_id:user_id,name:name}, // added by swap
      })})
     
    }
    else{
      history.push({
        pathname: actionPath,
        state: {self:self,user_id:user_id}, // added by swap
      })
    }
    
  }}>
    <div className='UpdateContainerHeader'>
      {header}
    </div>
    <div className='UpdateContainerSubHeader'>
    <div>{subHeader} </div>{tag && <span className={'tagHolder ' + tag }>{tag}</span>}
    </div>
    <hr />
    { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="Info" title="Info" content={'Please update your health status form first'} autoHideDuration = '2000'
           vertical= 'top' horizontal= 'center' />}
    </div>
  )
}
export default UpdatePanelStrip
