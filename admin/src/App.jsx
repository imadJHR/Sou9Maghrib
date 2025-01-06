import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const DashboardLayout = ({ children }) => (
  <div>
    <Navbar />
    <hr />
    <div className="flex relative">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

const ProtectedDashboard = ({ element }) => (
  <ProtectedRoute>
    <DashboardLayout>
      {element}
    </DashboardLayout>
  </ProtectedRoute>
);

const App = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedDashboard element={<Home />} />} />
        <Route path="/add" element={<ProtectedDashboard element={<Add />} />} />
        <Route path="/list" element={<ProtectedDashboard element={<List />} />} />
        <Route path="/orders" element={<ProtectedDashboard element={<Orders />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
  );
};

export default App;