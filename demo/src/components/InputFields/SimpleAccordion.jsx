import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  
  background: '#EEF8FF',
  root: {
    width: '100%',
flexDirection: 'row',
alignItems: 'center',
padding: '8px',
borderRadius: '6px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion({header,details}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faAngleDown} color="#17416B"  />}
          aria-controls="panel1a-content"
        >
          <Typography className={classes.heading}>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {details}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
