import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/login';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Profil from './pages/Profil/profil';
import Client from './pages/Admin/ListeClients/Client';
import Evaluation from './pages/Evaluation/Evaluation';
import ListDesColis from './pages/Livreur/ListDesColis/list';
import LivreurInterface from './pages/Admin/Livreurliste/LivreurInterface';
import TousClientsLivreur from './pages/Livreur/TousClientLivreur/TousClientsLivreur'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute component={Profil} />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/client" element={<ProtectedRoute component={Client} />} />
        
        <Route path="/livreurs" element={<ProtectedRoute component={LivreurInterface} />} />
        <Route path="/livlistcoli" element={<ProtectedRoute component={ListDesColis} />} />
        <Route path="/TousClientsLivreur" element={<ProtectedRoute component={TousClientsLivreur} />} />
        <Route path="/evaluation" element={<Evaluation />} /> 
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
