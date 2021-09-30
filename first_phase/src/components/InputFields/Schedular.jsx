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

export const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2021, 8, 23, 12, 30),
    endDate: new Date(2021, 8, 23, 11, 30),
  }, 
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2021, 8, 24, 9, 30),
    endDate: new Date(2021, 8, 24, 11, 30),
  }, 
];

export default class Schedular extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper onClick={(e)=>{e.target.className.includes('Cell-text-') && this.props.clickHandler(e)}}>
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
