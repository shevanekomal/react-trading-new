import './App.css';
import {FieldDataProvider} from './context/FieldData'
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header'

const App=()=> {
  return (
    <div className='App'>
      <FieldDataProvider>
     <Router> <Header /> </Router>
    </FieldDataProvider>
    </div>
  );
}
export default App;
