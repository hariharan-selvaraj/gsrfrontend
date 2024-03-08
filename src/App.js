import './App.css'
// import Dashboard from './component/admin/dashboard/AdminDashboard';
import Login from './component/login/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import TeleMainpage from './component/telecomperson/mainpage/TeleMainpage';
import Admin from './component/admin/Admin';
import { AuthProvider } from './component/Routers/AuthContext';
import PrivateRoute from './component/Routers/PrivateRoute';
import Telecom from './component/telecomperson/Telecom';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login  />} />
            <Route path='/admin/*' element={<PrivateRoute>
              <Admin />
            </PrivateRoute>} />
           
            <Route path='/telecom/*' element={<PrivateRoute>
              <Telecom />
            </PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
