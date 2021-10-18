import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState ,EditingState, IntegratedEditing} from "@devexpress/dx-react-scheduler";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import Room from '@material-ui/icons/Room';
import { FieldDataContext } from '../../context/FieldData'
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  ConfirmationDialog,
  AppointmentForm,
  Appointments,
  TodayButton,
  AppointmentTooltip,
 
  
} from "@devexpress/dx-react-scheduler-material-ui";

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});
const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#ffff00',
      height:'7px',
      marginTop: '1.2rem',
      
    }}
  >
    {children}
  </Appointments.Appointment>
);

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Room className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.provider}</span>
      </Grid>
      <Grid item xs={2} className={classes.textCenter}>
        <LinkIcon className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.provider_website}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

const messages = {
  moreInformationLabel: '',
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Provider"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.provider}
        onValueChange={onCustomFieldChange}
        placeholder="Enter Provider"
      />

<AppointmentForm.Label
        text="Provider Website"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.provider_website}
        onValueChange={onCustomFieldChange}
        placeholder="Enter Provider Webiste"
      />
    </AppointmentForm.BasicLayout>
  );
};

export default class Schedular extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.scheduledAppointments,
    };
   
    this.commitChanges = this.commitChanges.bind(this);
  }
  
  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        /*let data = {
          user_id:appointment.user_id,
          checkup_name:appointment.title,
          date:appointment.startDate
        }
       
        FieldDataContext.deleteCheckupEventPlan(data).then((response)=>{
          if(response.status){
            console.log(response)
          }
        });*/
        this.props.clickHandler(data.filter(appointment => appointment.id === deleted)[0])

        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  

  render() {
    const { data} = this.state;
    return (
      <Paper>
        <Scheduler data={data}>
          <ViewState />
          <EditingState
            onCommitChanges={this.commitChanges}
          
          />
          <IntegratedEditing />
          <MonthView />
         
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments 
          appointmentComponent={Appointment}
          />
          <ConfirmationDialog />

          <AppointmentTooltip
            contentComponent={Content}
            showDeleteButton
            showCloseButton
          />
           <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            messages={messages} />
        </Scheduler>
      </Paper>
    );
  }
}
