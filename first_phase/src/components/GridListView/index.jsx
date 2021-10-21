import React from 'react';
import {Item} from '../InputFields'
//import tileData from './tileData';
import './GridListView.css'



const GridListView =(props)=> {
  //  const items = ([{id:0,name:'Medical Checkups'},{id:1,name:'Physical Wellbeing'},{id:2,name:'Sleep'},{id:3,name:'Heart Health'},{id:4,name:'Vitamin B12'}]);
    const handleClick = (e,name,isDone) => {
     if(name === 'know yourself'){
        if(isDone){
          props.history.push({
            pathname: '/knowYourselfResult',
            state: {user_id:props.location.state.user_id,name:e.target.innerText}
          })
      }else if(e.target.innerText ==='Medical Checkups' || e.target.innerText ==='Physical Wellbeing' ) {
          props.history.push({
              pathname: '/knowYourself',
              state: {user_id:props.location.state.user_id,name:e.target.innerText},
          })
      }else {
        alert('Upcoming...')
      }
    }else if(name === 'your healthy habits'){
        if(isDone){   
          props.history.push({
            pathname: '/healthyHabitsResult',
            state: {user_id:props.location.state.user_id,name:e.target.innerText}
          })
      }else if(e.target.innerText ==='Physical') {
          props.history.push({
              pathname: '/knowYourself',
              state: {user_id:props.location.state.user_id,name:e.target.innerText},
      })
      }else {
        alert('Upcoming...')
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
        alert('Upcoming...')
      }
     
    }
     
     
  }

    const images = props.location.state.items.map((item) => {
        return (item.id % 2 == 0)?(<div style={{backgroundColor: `#DAEDEB`}} className='imgList' key={item.id} onClick={(e) => handleClick(e,props.location.state.name,item.isDone)}><div><div className='CarouselItem'>{item.name}</div><div className='CarouselItemFooter'>{item.text}</div></div>
        
        </div>):(<div style={{backgroundColor:`#FFD3B1`}} className='imgList' key={item.id} onClick={(e) => handleClick(e,props.location.state.name,item.isDone)}><div><div className='CarouselItem'>{item.name}</div><div className='CarouselItemFooter'>{item.text}</div></div></div>)
      });
      
      return  (
        <div className='GridContainer'>
          <div className="image-list">{images}</div>
        </div>);
}
export default GridListView
