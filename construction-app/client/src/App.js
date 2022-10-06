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
import Client from './components/Client';

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
              <Route path='/kunder' element={<CustomerRegister />} />
              <Route path='/bokföring' element={<Accounting />} />
              <Route path='/skapakund' element={<AddCustomer />} />
              <Route path='/kalender' element={<Calendar />} />
              <Route path='/kunder/:id' element={<Client />} />
            </Route>
            <Route element={<Error />} path="*"/>
            <Route element={<Login />} path="/login"/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
