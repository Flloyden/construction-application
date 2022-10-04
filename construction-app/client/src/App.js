import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accounting from './components/Accounting';
import AddCustomer from './components/AddCustomer';
import Calendar from './components/Calendar';
import CustomerRegister from './components/CustomerRegister';
import Home from './components/Home';
import Login from './components/Login';
import './styles/App.css';
import PrivateRoutes from './services/PrivateRoute';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Login />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route index element={<Home />} />
              <Route path='/kundregister' element={<CustomerRegister />} />
              <Route path='/bokföring' element={<Accounting />} />
              <Route path='/skapakund' element={<AddCustomer />} />
              <Route path='/kalender' element={<Calendar />} />
            </Route>
            <Route element={<Error />} path="*"/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
