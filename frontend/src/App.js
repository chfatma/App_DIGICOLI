import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/login';
import Dashboard from './pages/Admin/DashboardAdmin/Dashboard';
import Profil from './pages/Profil/profil';
import Client from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin';
import Evaluation from './pages/Evaluation/Evaluation';
import ListDesColis from './pages/Livreur/ListDesColis/list';
import LivreurInterface from './pages/Admin/Livreurliste/LivreurInterface';
import TousClientsLivreur from './pages/Livreur/TousClientLivreur/TousClientsLivreur'
import DashboardLivreur from './pages/Livreur/DashboardLivreur/DashboardLivreur'
import Ramassage from './pages/Livreur/Ramassage/Ramassage'
import ListeClientsAdmin from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin'
import ListeColisAdmin from './pages/Admin/ListeColisAdmin/ListeColisAdmin'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute component={Profil} />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/client" element={<ProtectedRoute component={Client} />} />
        ListeColis
        <Route path="/livreurs" element={<ProtectedRoute component={LivreurInterface} />} />
        <Route path="/livlistcoli" element={<ProtectedRoute component={ListDesColis} />} />
        <Route path="/TousClientsLivreur" element={<ProtectedRoute component={TousClientsLivreur} />} />
        <Route path="/DashboardLivreur" element={<ProtectedRoute component={DashboardLivreur} />} />
        <Route path="/Ramassage" element={<ProtectedRoute component={Ramassage} />} />
        <Route path="/Evaluation" element={<ProtectedRoute component={Evaluation} />} />
        <Route path="/ListeClientsAdmin" element={<ProtectedRoute component={ListeClientsAdmin} />} />
        <Route path="/Adminlistcoli" element={<ProtectedRoute component={ListeColisAdmin} />} />
      </Routes>
    </Router>
  );
}

const ProtectedRoute = ({ component: Component }) => {

  const isAuthenticated = true; 

  return isAuthenticated ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Login />
  );
};

export default App;
