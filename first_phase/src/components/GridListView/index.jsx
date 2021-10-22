import React , { useState } from 'react';
//import {Item} from '../InputFields'
//import tileData from './tileData';
import './GridListView.css'
import {Alerts} from '../InputFields'


const GridListView =(props)=> {
  //  const items = ([{id:0,name:'Medical Checkups'},{id:1,name:'Physical Wellbeing'},{id:2,name:'Sleep'},{id:3,name:'Heart Health'},{id:4,name:'Vitamin B12'}]);
  const [UpcomingOpen, setUpcomingOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('Upcoming'); 
  const handleClick = (e,name,isDone,text) => {
     if(name === 'know yourself'){
        if(isDone){
          props.history.push({
            pathname: '/knowYourselfResult',
            state: {user_id:props.location.state.user_id,name:e.target.innerText}
          })
      }else if(e.target.innerText ==='Medical Checkups' || e.target.innerText ==='Physical Wellbeing' ) {
        if(props.location.state.list.includes('healthStatus')){
          //  alert('Please update your health status form first')
          setOpen(true)
        }else{
          props.history.push({
              pathname: '/knowYourself',
              state: {user_id:props.location.state.user_id,name:e.target.innerText},
          })
        }
      }else {
        if(text === 'Upcoming in 1 week')
                setMsg('This health topic is coming in 1 week. We will send you a notification when it is here.')
           else if(text === 'Upcoming in 2 weeks')
                    setMsg('This health topic is coming in 2 weeks. We will send you a notification when it is here.')
               else
                   setMsg('This health topic is coming in few weeks. We will send you a notification when it is here.')

        setUpcomingOpen(true)
      }
    }else if(name === 'your healthy habits'){
        if(isDone){   
          props.history.push({
            pathname: '/healthyHabitsResult',
            state: {user_id:props.location.state.user_id,name:e.target.innerText}
          })
      }else if(e.target.innerText ==='Physical') {
        if(props.location.state.list.includes('healthStatus')){
          setOpen(true)
        //  alert('Please update your health status form first')
      }else{
          props.history.push({
              pathname: '/knowYourself',
              state: {user_id:props.location.state.user_id,name:e.target.innerText},
      })
    }
      }else {
       // alert('Upcoming...')
       if(text === 'Upcoming in 1 week')
       setMsg('This health topic is coming in 1 week. We will send you a notification when it is here.')
   else if(text === 'Upcoming in 2 weeks')
        setMsg('This health topic is coming in 2 weeks. We will send you a notification when it is here.')
   else
       setMsg('This health topic is coming in few weeks. We will send you a notification when it is here.')

   setUpcomingOpen(true)
      }
    }else {
      if(e.target.innerText === 'Physical Wellbeing'){
        props.history.push({
          pathname: '/pdf',
          state: {user_id:props.location.state.user_id,pdfName:'physicalPDF'}
        })
      }else if(e.target.innerText === 'Medical Checkups') {
        props.history.push({
          pathname: '/pdf',
          state: {user_id:props.location.state.user_id,pdfName:'medicalPDF'}
        })
      }else {
       // alert('Upcoming...')
       if(text === 'Upcoming in 1 week')
       setMsg('This health topic is coming in 1 week. We will send you a notification when it is here.')
   else if(text === 'Upcoming in 2 weeks')
        setMsg('This health topic is coming in 2 weeks. We will send you a notification when it is here.')
   else
       setMsg('This health topic is coming in few weeks. We will send you a notification when it is here.')

   setUpcomingOpen(true)
      }
     
    }
     
     
  }

    const images = props.location.state.items.map((item) => {
        return (item.id % 2 == 0)?(<div style={{backgroundColor: `#DAEDEB`}} className='imgList' key={item.id} onClick={(e) => handleClick(e,props.location.state.name,item.isDone,item.text)}><div><div className='CarouselItem'>{item.name}</div><div className='CarouselItemFooter'>{item.text}</div></div>
        
        </div>):(<div style={{backgroundColor:`#FFD3B1`}} className='imgList' key={item.id} onClick={(e) => handleClick(e,props.location.state.name,item.isDone,item.text)}><div><div className='CarouselItem'>{item.name}</div><div className='CarouselItemFooter'>{item.text}</div></div></div>)
      });
      
      return  (
        <div className='GridContainer'>
          <div className="image-list">{images}</div>
          { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="Info" title="Info" content={'Please update your health status form first'} autoHideDuration = '6000'
           vertical= 'top' horizontal= 'center' />}
           
          { UpcomingOpen &&  <Alerts
          handleClose ={()=>setUpcomingOpen(false)} 
           isOpen={UpcomingOpen} type="Info" title="Info" content={msg} autoHideDuration = '6000'
           vertical= 'top' horizontal= 'center' />}
        </div>);
}
export default GridListView
