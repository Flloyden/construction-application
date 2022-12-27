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
import Customer from './components/Customer';
import '../src/styles/index.css';
import AddWarant from './components/AddWarranty';
import Settings from './components/Settings';
import About from './components/About';
import Help from './components/Help';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='flex bg-blue-50 h-screen'>
          <Login />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route index element={<Home />} />
              <Route path='/kunder' element={<CustomerRegister />} />
              <Route path='/garantier' element={<Accounting />} />
              <Route path='/skapakund' element={<AddCustomer />} />
              <Route path='/skapagaranti' element={<AddWarant />} />
              <Route path='/kalender' element={<Calendar />} />
              <Route path='/kunder/:id' element={<Customer />} />
              <Route path='/om' element={<About />} />
              <Route path='/help' element={<Help />} />
              <Route path='/settings' element={<Settings />} />
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
