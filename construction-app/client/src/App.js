import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accounting from './components/Accounting';
import AddCustomer from './components/AddCustomer';
import Calendar from './components/Calendar';
import CustomerRegister from './components/CustomerRegister';
import Home from './components/Home';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path='/kundregister' element={<CustomerRegister />} />
          <Route path='/bokföring' element={<Accounting />} />
          <Route path='/skapakund' element={<AddCustomer />} />
          <Route path='/kalender' element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
