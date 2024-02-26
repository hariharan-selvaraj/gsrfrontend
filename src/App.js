import './App.css'
// import Dashboard from './component/admin/dashboard/AdminDashboard';
import Login from './component/login/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import TeleMainpage from './component/telecomperson/mainpage/TeleMainpage';
import Admin from './component/admin/Admin';
import { AuthProvider } from './component/authContext/AuthContext';
import PrivateRoutes from './component/authContext/PrivateRoutes';
function App() {
  return (
    <div>
        <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/admin/*' element={
              <PrivateRoutes>
                <Admin />
              </PrivateRoutes>
            } />
          </Routes>
        </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
