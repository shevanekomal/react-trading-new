import React from 'react'
import { useHistory } from "react-router-dom";

const UpdatePanelStrip=(props) =>{
  const history = useHistory();
  const {header,subHeader,tag,actionPath,self,list,name,user_id} = props
  
  return (<div className='UpdateContainer' onClick={()=>{
   
    if(name === 'Medical Checkups' || name === 'Physical Wellbeing'){
    //  console.log(list)
     if(list.includes('healthStatus')){
       alert('Please update your health status form first')
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
    </div>
  )
}
export default UpdatePanelStrip
