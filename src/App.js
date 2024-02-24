import './App.css'
// import Dashboard from './component/admin/dashboard/AdminDashboard';
import Login from './component/login/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import TeleMainpage from './component/telecomperson/mainpage/TeleMainpage';
import Admin from './component/admin/Admin';
import Dashboard from './component/admin/dashboard/AdminDashboard';
function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/Dashboard' element={<Dashboard />} />
            {/* <Route path='/telecom' element={<TeleMainpage />} /> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
