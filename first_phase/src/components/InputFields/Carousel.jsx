import React, { useState } from "react";
import Item from "./Item";
import { Button } from '@material-ui/core';
//import Carousel from 'react-material-ui-carousel';
import Carousel ,{ consts } from 'react-elastic-carousel';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const breakPoints = [
  { width:600, itemsToShow: 2 ,itemsToScroll: 2},
 /* { width: 600, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }*/
];

export default function Carousell({backgroundColorEven,backgroundColorOdd,handleClick}) {
  
    const [items, setItems] = useState([1, 2, 3, 4, 5]);

    const myArrow = ({ type, onClick, isEdge }) => {
        const pointer = type === consts.PREV ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />
        return (
          <Button onClick={onClick} disabled={isEdge}>
            {pointer}
          </Button>
        )
    }
    return (
        <div >
            <Carousel renderArrow={myArrow} breakPoints={breakPoints} >
              {items.map((item) => (
                 (item % 2 == 0)?(<div key={item} onClick={(e)=>console.log(e.target.innerText)}><Item onClickItem={(e)=>console.log(e.target.innerText)} style={{backgroundColor: `${backgroundColorOdd}`}} key={item}>{item}</Item></div>):(<div key={item} onClick={(e)=>console.log(e.target.innerText)}><Item style={{backgroundColor:`${backgroundColorEven}`}} key={item}>{item}</Item> </div>)
               
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