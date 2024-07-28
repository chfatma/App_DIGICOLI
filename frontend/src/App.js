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
import DashboardAdmin from './pages/SuperAdmin/DashboardAdmin/DashboardSuperAdmin' ;
import Ramassage from './pages/Admin/Ramassage/Ramassage';
import ListeClientsAdmin from './pages/Admin/ListeClientsAdmin/ListeClientsAdmin';
import ListeAdmin from './pages/SuperAdmin/AdminListe/ListeAdmin' ; 
import ListeColisAdmin from './pages/Admin/ListeColisAdmin/ListeColisAdmin';
import EditProfile from './pages/EditProfile/EditProfile';
import Paiement from './pages/Clients/Paiement/Paiement'
import listecolisclient from './pages/Clients/ListeColisClients/listecolisclient';
import DashboardClient from './pages/Clients/DashboardClients/DashboardClient';
import QRCodeGenerator from './pages/Admin/QRCodeGenerator/QRCodeGenerator';
import EditLivreurAdmin from './pages/Admin/EditLivreurAdmin/EditLivreurAdmin';
import EditAdmin from './pages/SuperAdmin/EditAdmin/EditAdmin' ;
import Calendrier from './pages/Calendrier/Calendrier';
import EditClientAdmin from './pages/Admin/EditClientAdmin/EditClientAdmin'
import SuiviColi from './pages/Clients/SuiviColis/SuiviColi'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          {/*Interface of the commun */}
        
       
        <Route path="/EditProfile" element={<ProtectedRoute component={EditProfile} />} />
        <Route path="/Evaluation" element={<ProtectedRoute component={Evaluation} />} />
        <Route path="/Calendrier" element={<ProtectedRoute component={Calendrier} />} />

       {/*Interface of the Super Admin */}

       
       
       <Route path="/DashboardAdmin" element={<ProtectedRoute component={DashboardAdmin} />} />
       <Route path="/edit-admin/:id" element={<ProtectedRoute component={EditAdmin} />} />
       <Route path="/ListeAdmin" element={<ProtectedRoute component={ListeAdmin} />} />

       {/*Interface of the Admin */}

       <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
       <Route path="/edit-livreur/:id" element={<ProtectedRoute component={EditLivreurAdmin} />} />
       <Route path="/edit-client-admin/:id" element={<ProtectedRoute component={EditClientAdmin} />} />
       <Route path="/Ramassage" element={<ProtectedRoute component={Ramassage} />} />
       <Route path="/QRCodeGenerator/:id" element={<ProtectedRoute component={QRCodeGenerator } />} />


       <Route path="/client" element={<ProtectedRoute component={Client} />} />
        <Route path="/ListeClientsAdmin" element={<ProtectedRoute component={ListeClientsAdmin} />} />
        <Route path="/Adminlistcoli" element={<ProtectedRoute component={ListeColisAdmin} />} />
         
         
         {/*Interface of the livreur */}


         <Route path="/DashboardLivreur" element={<ProtectedRoute component={DashboardLivreur} />} />
         <Route path="/livreurs" element={<ProtectedRoute component={LivreurInterface} />} />
         <Route path="/TousClientsLivreur" element={<ProtectedRoute component={TousClientsLivreur} />} />
         <Route path="/livlistcoli" element={<ProtectedRoute component={ListDesColis} />} />
        
        
        {/*Interface of the Client */}
        <Route path="/DashboardClient" element={<ProtectedRoute component={DashboardClient} />} />
        <Route path="/Paiement" element={<ProtectedRoute component={Paiement} />} />
        <Route path="/listecolisclient" element={<ProtectedRoute component={listecolisclient} />} />
        <Route path="/SuiviColi" element={<ProtectedRoute component={SuiviColi} />} />
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
