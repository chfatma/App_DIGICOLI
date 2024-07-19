import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/login';
import Dashboard from './pages/Admin/DashboardAdmin/Dashboard';

import Client from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin';
import Evaluation from './pages/Evaluation/Evaluation';
import ListDesColis from './pages/Livreur/ListDesColis/list';
import LivreurInterface from './pages/Admin/Livreurliste/LivreurInterface';
import TousClientsLivreur from './pages/Livreur/TousClientLivreur/TousClientsLivreur';
import DashboardLivreur from './pages/Livreur/DashboardLivreur/DashboardLivreur';
import Ramassage from './pages/Admin/Ramassage/Ramassage';
import ListeClientsAdmin from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin';
import ListeColisAdmin from './pages/Admin/ListeColisAdmin/ListeColisAdmin';
import EditProfile from './pages/EditProfile/EditProfile';
import Paiement from './pages/Clients/Paiement/Paiement'
import listecolisclient from './pages/Clients/ListeColisClients/listecolisclient'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          {/*Interface of the commun */}
       
        <Route path="/EditProfile" element={<ProtectedRoute component={EditProfile} />} />
        <Route path="/Evaluation" element={<ProtectedRoute component={Evaluation} />} />

       {/*Interface of the Admin */}

       <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
       <Route path="/Ramassage" element={<ProtectedRoute component={Ramassage} />} />
       <Route path="/client" element={<ProtectedRoute component={Client} />} />
        <Route path="/ListeClientsAdmin" element={<ProtectedRoute component={ListeClientsAdmin} />} />
        <Route path="/Adminlistcoli" element={<ProtectedRoute component={ListeColisAdmin} />} />
         
         
         {/*Interface of the livreur */}


         <Route path="/DashboardLivreur" element={<ProtectedRoute component={DashboardLivreur} />} />
         <Route path="/livreurs" element={<ProtectedRoute component={LivreurInterface} />} />
         <Route path="/TousClientsLivreur" element={<ProtectedRoute component={TousClientsLivreur} />} />
         <Route path="/livlistcoli" element={<ProtectedRoute component={ListDesColis} />} />
        
        
        {/*Interface of the Client */}
        
        <Route path="/Paiement" element={<ProtectedRoute component={Paiement} />} />
        <Route path="/listecolisclient" element={<ProtectedRoute component={listecolisclient} />} />
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
