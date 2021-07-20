import './App.css';
import AddForm from './components/AddForm/AddForm';
import {FieldDataProvider} from './context/FieldData'
import HealthPlan from './components/HealthPlan'
function App() {
  return (
    <FieldDataProvider>
    {/* <AddForm /> */}
    <HealthPlan />
    </FieldDataProvider>
  );
}

export default App;
