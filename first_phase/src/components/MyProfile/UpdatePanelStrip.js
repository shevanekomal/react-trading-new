import React from 'react'

const UpdatePanelStrip=(props) =>{
  const {header,subHeader,tag,actionPath} = props
  return (<div className='UpdateContainer' onClick={()=>{
     props.history.push({
        pathname: actionPath,
        //state: {self,user_id:response.data.user_id}, // added by swap
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
