import './App.css';
import HealthStatusForm from './components/HealthStatusForm';
import {FieldDataProvider} from './context/FieldData'
import HealthPlan from './components/HealthPlan'
import Header from './components/Header'
function App() {
  return (
    <div className='App'>
      <FieldDataProvider>
    <Header />
    {/* <HealthStatusForm /> */}
    {/* <HealthPlan /> */}
    </FieldDataProvider>
    </div>
  );
}

export default App;
