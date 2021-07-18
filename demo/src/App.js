import './App.css';
import AddForm from './components/AddForm/AddForm';
import {FieldDataProvider} from './context/FieldData'
function App() {
  return (
    <FieldDataProvider>
    <AddForm />
    </FieldDataProvider>
  );
}

export default App;
