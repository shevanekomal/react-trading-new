import { makeStyles,Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
export default function Buttons({children,bgColor,onClick}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button onClick={onClick} variant="outlined" style={{background:`${bgColor}`}}>{children}</Button>
    </div>
  );
}
