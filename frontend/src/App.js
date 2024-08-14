import React, { useState, useEffect } from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Layout from './components/Layout/Layout';
import Login from './pages/Login/login';
import Dashboard from './pages/Admin/DashboardAdmin/Dashboard';
import Client from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin';
import Evaluation from './pages/Evaluation/Evaluation';
import ListDesColis from './pages/Livreur/ListDesColis/list';
import LivreurInterface from './pages/Admin/Livreurliste/LivreurInterface';
import TousClientsLivreur from './pages/Livreur/TousClientLivreur/TousClientsLivreur';
import DashboardLivreur from './pages/Livreur/DashboardLivreur/DashboardLivreur';
import DashboardAdmin from './pages/SuperAdmin/DashboardAdmin/DashboardSuperAdmin';
import Ramassage from './pages/Admin/Ramassage/Ramassage';
import ListeClientsAdmin from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin';
import ListeAdmin from './pages/SuperAdmin/AdminListe/ListeAdmin'; 
import ListeColisAdmin from './pages/Admin/ListeColisAdmin/ListeColisAdmin';
import EditProfile from './pages/EditProfile/EditProfile';
import Paiement from './pages/Clients/Paiement/Paiement';
import ListeColisClient from './pages/Clients/ListeColisClients/listecolisclient';
import DashboardClient from './pages/Clients/DashboardClients/DashboardClient';
import QRCodeGenerator from './pages/Admin/QRCodeGenerator/QRCodeGenerator';
import EditLivreur from './pages/Admin/EditLivreurAdmin/EditLivreurAdmin';
import EditAdmin from './pages/SuperAdmin/EditAdmin/EditAdmin';
import Calendrier from './pages/Calendrier/Calendrier';
import EditClient from './pages/Admin/EditClientAdmin/EditClientAdmin';
import SuiviColi from './pages/Clients/SuiviColis/SuiviColi';
import GoogleMapComponent from './pages/Livreur/Emplacement/GoogleMapComponent';
import SupportLivreur from './pages/Livreur/SupportLivreur/Support';
import EditColis from './pages/Admin/EditColis/EditColis';
import Statistics from './pages/SuperAdmin/RatingStatistics/Statistics';


import Depot from './pages/Admin/Depot/Depot';


function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Retrieve values from local storage
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole');
    const storedSuperadminId = localStorage.getItem('superadminId');

    
    
    
    // Log values to the console
    console.log('Stored userId:', storedUserId);
    console.log('Stored userRole:', storedUserRole);
    console.log('Stored superadminId:', storedSuperadminId);

    // Set user role if available
    if (storedUserId && storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  // Function to set the user role based on login response
  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <Router>    
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Interface of the common */}
        <Route path="/EditProfile/:id" element={<ProtectedRoute component={EditProfile} userRole={userRole} />} />
        <Route path="/Evaluation" element={<ProtectedRoute component={Evaluation} userRole={userRole} />} />
        <Route path="/Calendrier" element={<ProtectedRoute component={Calendrier} userRole={userRole} />} />
       





        {/* Interface of the Super Admin */}
        <Route path="/DashboardAdmin" element={<ProtectedRoute component={DashboardAdmin} userRole={userRole} />} />
        <Route path="/edit-admin/:id" element={<ProtectedRoute component={EditAdmin} userRole={userRole} />} />
        <Route path="/ListeAdmin" element={<ProtectedRoute component={ListeAdmin} userRole={userRole} />} />
        <Route path="/Statistics" element={<ProtectedRoute component={Statistics} userRole={userRole} />} />

        {/* Interface of the Admin */}
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} userRole={userRole} />} />
        <Route  path="/edit-livreur/:id" element={<ProtectedRoute component={EditLivreur} userRole={userRole} />} />
        <Route path="/edit-client/:id" element={<ProtectedRoute component={EditClient} userRole={userRole} />} />  
        <Route path="/Ramassage" element={<ProtectedRoute component={Ramassage} userRole={userRole} />} />
        <Route path="/QRCodeGenerator/:id" element={<ProtectedRoute component={QRCodeGenerator} userRole={userRole} />} />
        <Route path="/client" element={<ProtectedRoute component={Client} userRole={userRole} />} />
        <Route path="/ListeClientsAdmin" element={<ProtectedRoute component={ListeClientsAdmin} userRole={userRole} />} />
        <Route path="/Adminlistcoli" element={<ProtectedRoute component={ListeColisAdmin} userRole={userRole} />} />
    
        <Route path="/edit-colis/:id" element={<ProtectedRoute component={EditColis} userRole={userRole} />} />
        <Route path="/Depot" element={<ProtectedRoute component={Depot} userRole={userRole} />} />




        {/* Interface of the livreur */}
        <Route path="/DashboardLivreur" element={<ProtectedRoute component={DashboardLivreur} userRole={userRole} />} />
        <Route path="/livreurs" element={<ProtectedRoute component={LivreurInterface} userRole={userRole} />} />
        <Route path="/TousClientsLivreur" element={<ProtectedRoute component={TousClientsLivreur} userRole={userRole} />} />
        <Route path="/livlistcoli" element={<ProtectedRoute component={ListDesColis} userRole={userRole} />} />
        <Route path="/GoogleMapComponent" element={<ProtectedRoute component={GoogleMapComponent} userRole={userRole} />} /> {/* Add route for the map */}
        <Route path="/SupportLivreur" element={<ProtectedRoute component={SupportLivreur} userRole={userRole} />} />



        {/* Interface of the Client */}
        <Route path="/DashboardClient" element={<ProtectedRoute component={DashboardClient} userRole={userRole} />} />
        <Route path="/Paiement" element={<ProtectedRoute component={Paiement} userRole={userRole} />} />
        <Route path="/listecolisclient" element={<ProtectedRoute component={ListeColisClient} userRole={userRole} />} />
        <Route path="/SuiviColi" element={<ProtectedRoute component={SuiviColi} userRole={userRole} />} />
      </Routes>
    </Router>
  );
}

const ProtectedRoute = ({ component: Component, userRole }) => {
  const isAuthenticated = !!userRole;

  return isAuthenticated ? (
    <Layout userRole={userRole}>
      <Component />
    </Layout>
  ) : (
    <Login />
  );
};

export default App;
