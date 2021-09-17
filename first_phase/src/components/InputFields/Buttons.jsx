import { makeStyles,Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
   
  },
}));

export default function Buttons({children,bgColor,onClick,disabled,buttonColor,...fieldsProps}) {
  const classes = useStyles();
  buttonColor = buttonColor || 'rgba(7, 33, 60, 0.85)'
  return (
    <div  className={classes.root + ' ButtonContainer'}>
      <Button  onClick={onClick} className ='Button' variant="outlined" disabled ={disabled} {...fieldsProps} style={{background:`${bgColor}`,color:`${buttonColor}`}}>{children}</Button>
    </div>
  );
}
