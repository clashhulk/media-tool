import './App.css';

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './functions/ProtectedRoutes';
import Dashboard from './views/Dashboard';
import EmailVerification from './views/EmailVerification';
import Login from './views/Login';
import ResetPassword from './views/ResetPassword';
import Unauthorized from './views/Unauthorized';

function App() {
  return (
    <Routes basename="/">
      <Route path="/" element={<Login />} />
      <Route path="/EmailVerification" element={<EmailVerification />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route element={<ProtectedRoutes allowedRoles={[2, 3, 4, 5, 7, 8, 9]} />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/*" element={<Unauthorized />} />
    </Routes>
  );
}
export default App;
