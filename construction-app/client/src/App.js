import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accounting from './components/accounting/Accounting';
import Calendar from './components/calendar/Calendar';
import Home from './components/home/Home';
import Login from './components/authentication/Login';
import './styles/App.css';
import PrivateRoutes from './services/PrivateRoute';
import Error from './components/Error';
import Customer from './components/customers/Customer';
import '../src/styles/index.css';
import Settings from './components/settingsPages/Settings';
import About from './components/info/About';
import Help from './components/info/Help';
import Recover from './components/authentication/Recover';
import CustomerRegister from './components/customers/CustomerRegister';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={'/bits'}>
        <div className='flex bg-blue-50 h-screen'>
          <Login />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route index element={<Home />} />
              <Route path='/kunder' element={<CustomerRegister />} />
              <Route path='/garantier' element={<Accounting />} />
              <Route path='/kalender' element={<Calendar />} />
              <Route path='/kunder/:id' element={<Customer />} />
              <Route path='/om' element={<About />} />
              <Route path='/help' element={<Help />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
            <Route element={<Error />} path="*"/>
            <Route element={<Login />} path="/login"/>
            <Route element={<Recover />} path="/recover"/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
