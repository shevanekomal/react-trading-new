
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import {useState} from 'react'

export default function Alerts({isOpen,handleClose,content,type,title,autoHideDuration}) {
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  return (
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={isOpen} autoHideDuration={autoHideDuration} onClose={()=>handleClose()} >
        <Alert
        severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon  fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
        <AlertTitle><b>{title}</b></AlertTitle>
        {content}
        </Alert>
    </Snackbar>
  );
}
