import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  flex:'none',
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

export default function SimpleAccordion({header,recommended_details,whyrecommended_details,frequency,conditions,test_details,other_info,checkup_category}) {
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
          <p>  {'This checkup is '}<b>{recommended_details}</b>{' for you '} {'because '}
         <b>  {whyrecommended_details}</b></p>
         <p> {'The recommended frequency for your risk level is '} <b>{frequency}</b> </p>
         {conditions !== '' ?(<p>{checkup_category !== 'Doctor Checkup' ? ' This checkup is used to diagnose ' :' This checkup is used to diagnose/protect against '} <b> {conditions}</b></p>):''}
         {test_details !== '' ?(<p>{test_details}</p>):''}
         {other_info !== '' ?(<p>{other_info}</p>):''}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
