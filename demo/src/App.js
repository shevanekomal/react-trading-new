import './App.css';
import AddForm from './components/AddForm/AddForm';
import {FieldDataProvider} from './context/FieldData'
import HealthPlan from './components/HealthPlan'
import Header from './components/Header'
function App() {
  return (
    <div className='App'>
      <FieldDataProvider>
    <Header />
    {/* <AddForm /> */}
    {/* <HealthPlan /> */}
    </FieldDataProvider>
    </div>
  );
}

export default App;
