import React, { useState } from "react";
import Item from "./Item";
import { Button } from '@material-ui/core';
//import Carousel from 'react-material-ui-carousel';
import Carousel ,{ consts } from 'react-elastic-carousel';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {useWindowSize} from '../../utility'



export default function Carousell({backgroundColorEven,backgroundColorOdd,props,items,name,list}) {

    const [width] = useWindowSize();
    let itemToshow = width > 990 ? 2:1
    const breakPoints = [
        { width:600, itemsToShow: itemToshow ,itemsToScroll: itemToshow},
       /* { width: 600, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }*/
      ];
    /*if(name ==='your healthy habits')
        setItems(['Physical','Mental','Self-examination','Dental','Seasonal & Others'])
    else if(name ==='know yourself')
         setItems(['Medical Checkups','Physical Wellbeing','Sleep','Heart Health','Vitamin B12'])
    else if(name ==='know health topics')
         setItems(['Medical Checkups','Physical Wellbeing','Sleep','Heart Health','Vitamin B12']) */
    
    const myArrow = ({ type, onClick, isEdge }) => {
        const pointer = type === consts.PREV ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />
        return (
          <Button style={{visibility:'visible'}} onClick={onClick} disabled={isEdge}>
            {pointer}
          </Button>
        )
    }
    const handleClick = (e,name,isDone) => {
   // console.log(name)
        if(name === 'know yourself'){
            if(isDone){
                props.history.push({
                  pathname: '/knowYourselfResult',
                  state: {user_id:props.location.state.user_id,name:e.target.innerText}
                })
            }else if(e.target.innerText ==='Medical Checkups' || e.target.innerText ==='Physical Wellbeing' ){
                if(list.includes('healthStatus')){
                    alert('Please update your health status form first')
                }else{
                    props.history.push({
                        pathname: '/knowYourself',
                        state: {user_id:props.location.state.user_id,name:e.target.innerText},
                    })
                }
            }else {
                alert('Upcoming...')
            }
        }else  if(name === 'your healthy habits'){
            if(isDone){
               
                props.history.push({
                  pathname: '/healthyHabitsResult',
                  state: {user_id:props.location.state.user_id,name:e.target.innerText}
                })
            }
            else if(e.target.innerText ==='Physical'){
                if(list.includes('healthStatus')){
                    alert('Please update your health status form first')
                }else{
                    props.history.push({
                        pathname: '/knowYourself',
                        state: {user_id:props.location.state.user_id,name:e.target.innerText},
                    })
                }
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
    return (
        <div >
            <Carousel renderArrow={myArrow} breakPoints={breakPoints} >
              {items.map((item) => (
                 (item.id % 2 == 0)?
                     (<Item onClick={(e) => handleClick(e,name,item.isDone)} style={{backgroundColor: `${backgroundColorOdd}`}} key={item.id}><div><div className='CarouselItem'>{item.name}</div><div className='CarouselItemFooter'>{item.text}</div></div></Item>)
                     :(<Item onClick={(e) => handleClick(e,name,item.isDone)} style={{backgroundColor:`${backgroundColorEven}`}} key={item.id}><div><div className='CarouselItem'>{item.name}</div><div className='CarouselItemFooter'>{item.text}</div></div></Item>)
               
              ))}
            </Carousel>
        </div>
    );
}
/*export default function Carousell(props) {
    const items = [
        {
            name: 'Aya Bouchiha',
            description: 'Full Stack Web Developer',
        },
        {
            name: 'John Doe',
            description: 'Author',
        },
        {
            name: 'Pitsu Coma',
            description: 'Math Student',
        },
    ];

    return (
        <Carousel >
            {items.map((item, i) => (
                <Item key={i} {...item} />
            ))}
        </Carousel>
    );
    
}

const Item = ({name, description}) => {
    return (
        <Paper>
            <h2>{name}</h2>
            <p>{description}</p>
            <Button>more info...</Button>
        </Paper>
    );
};*/