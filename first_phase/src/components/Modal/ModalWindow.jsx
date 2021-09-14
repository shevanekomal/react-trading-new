import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  ModalWindow: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius:'6px',
  },
}));

export default function ModalWindow({children,open,handleClose,handleOpen,handleClick,option1,option2}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={handleClick}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.ModalWindow }>
      {children}
      <br />
     <button name = {option1} className={'activeButtonStyle customButton'} onClick={()=>handleClose()}>{option1}</button>
    { option2 !== '' && <button name = {option2} className={'activeButtonStyle customButton'} onClick={(e)=>handleClick(e)}>{option2}</button>}
    </div>
      </Modal>
    </div>
  );
}
