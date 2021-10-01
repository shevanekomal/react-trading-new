import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton
} from "@devexpress/dx-react-scheduler-material-ui";



export default class Schedular extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.scheduledAppointments
    };
  }

  render() {
    const { data } = this.state;
    return (
      <Paper onClick={(e)=>{e.target.nodeName.includes('svg') && this.props.clickHandler(e)}}>
        <Scheduler data={data}>
          <ViewState />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
