import './App.css'
// import Dashboard from './component/admin/dashboard/AdminDashboard';
import Login from './component/login/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import TeleMainpage from './component/telecomperson/mainpage/TeleMainpage';
import Admin from './component/admin/Admin';
import { AuthProvider, useAuth } from './component/Routers/AuthContext';
import PrivateRoute from './component/Routers/PrivateRoute';
import Telecom from './component/telecomperson/Telecom';
import PageNotFound from './component/PageNotFound';
import Accountant from './component/accountant/Accountant';
function App() {

  // console.log(roleType);
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login  />} />
            <Route path='*' element={<PageNotFound/>} />
            <Route path='/admin/*' element={<PrivateRoute allowedRoles="admin">
                <Admin />
              </PrivateRoute>} />
            <Route path='/telecom/*' element={<PrivateRoute allowedRoles="telecom">
              <Telecom />
            </PrivateRoute>} />
            <Route path='/accountant/*' element={<PrivateRoute allowedRoles="accountant">
              <Accountant />
            </PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
