import { makeStyles,Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
export default function Buttons({children,bgColor,onClick,disabled,...fieldsProps}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button onClick={onClick} className ='Button' variant="outlined" disabled ={disabled} {...fieldsProps} style={{background:`${bgColor}`}}>{children}</Button>
    </div>
  );
}
