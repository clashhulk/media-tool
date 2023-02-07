import './dashboard.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminProfile from '../components/dashboard-user/Profile';
import ResetPassword from '../components/dashboard-user/ResetPassword';
import Leftbar from '../components/leftbar/Leftbar';
import Topbar from '../components/topbar/Topbar';
import ProtectedRoutes from './../functions/ProtectedRoutes';
import BriefAssign from './assign_briefs/BriefAssign';
import ClientAssign from './assign_clients/ClientAssign';
import BriefSummary from './brief/BriefSummary';
import BriefMasterCrud from './briefMaster/BriefMasterCrud';
import BriefMasterList from './briefMaster/BriefMasterList';
import Brieform from './Brieform/Brieform';
import BriefTable from './Brieform/BriefTable';
import ClientAdd from './client/ClientAdd';
import ClientList from './client/ClientList';
import ClientMasterAdd from './clientMaster/ClientMasterAdd';
import ClientMasterList from './clientMaster/ClientMasterList';
import Home from './home/Home';
import MediaPlanList from './media/MediaPlanList';
import MediaUpload from './media/MediaUpload';
import UserAdd from './user/UserAdd';
import UserList from './user/UserList';

// import ClientEdit from './client/ClientEdit';
export default function Dashboard() {
  return (
    <div>
      <div className="container">
        <Leftbar />
        <div className="contentPanel">
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile">
              <Route index element={<AdminProfile />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="clientmaster">
              <Route index element={<ClientMasterList />} />
              <Route path="add" element={<ClientMasterAdd />} />
              <Route path="crud" element={<ClientMasterAdd />} />
              <Route path="*" element={<ClientList />} />
            </Route>
            <Route path="client">
              <Route
                element={<ProtectedRoutes allowedRoles={[2, 3, 4, 5, 6]} />}>
                <Route index element={<ClientList />} />
              </Route>
              <Route path="add" element={<ClientAdd />} />
              <Route path="crud" element={<ClientAdd />} />
              <Route path="*" element={<ClientList />} />
            </Route>
            <Route path="user">
              <Route index element={<UserList />} />
              <Route path="crud" element={<UserAdd />} />
              {/* <Route path="edit" element={<UserEdit />} /> */}
              <Route path="*" element={<UserList />} />
            </Route>
            <Route path="assign-clients">
              <Route index element={<ClientAssign />} />
            </Route>
            <Route path="assign_briefs">
              <Route index element={<BriefAssign />} />
            </Route>

            <Route path="briefsummary">
              <Route index element={<BriefSummary />} />
            </Route>
            <Route path="briefmaster">
              <Route index element={<BriefMasterList />} />
              <Route path="crud" element={<BriefMasterCrud />} />
            </Route>
            <Route path="Brieform/:id" element={<Brieform />} />
            <Route path="BriefTable">
              <Route index element={<BriefTable />} />
            </Route>

            <Route path="BriefAssign">
              <Route index element={<BriefAssign />} />
            </Route>
            <Route path="mediaplanlist">
              <Route index element={<MediaPlanList />} />
            </Route>
            <Route path="MediaUpload">
              <Route index element={<MediaUpload />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
