import React from 'react'

const UpdatePanelStrip=(props) =>{
  const {header,subHeader,tag,actionPath} = props
  return (<div onClick={()=>{
     props.history.push({
        pathname: actionPath,
        //state: {self,user_id:response.data.user_id}, // added by swap
      })
  }}>
    <div>
      {header}
    </div>
    <div>
      {subHeader} <span>{tag}</span>
    </div>
    </div>
  )
}
export default UpdatePanelStrip
