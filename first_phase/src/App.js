import './App.css';
import {FieldDataProvider} from './context/FieldData'
import Header from './components/Header'

const App=()=> {
  return (
    <div className='App'>
      <FieldDataProvider>
      <Header />
    </FieldDataProvider>
    </div>
  );
}
export default App;
