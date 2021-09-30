import React from 'react'
import { useHistory } from "react-router-dom";

const UpdatePanelStrip=(props) =>{
  const history = useHistory();
  const {header,subHeader,tag,actionPath,self,user_id} = props
  return (<div className='UpdateContainer' onClick={()=>{
     history.push({
        pathname: actionPath,
        state: {self:self,user_id:user_id}, // added by swap
      })
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
