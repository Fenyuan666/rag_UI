import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Result } from 'antd';
import { useState } from 'react';
import LayoutShell from './components/LayoutShell';
import type { Role } from './types';
import Login from './pages/common/Login';
import Profile from './pages/common/Profile';
import SuperDashboard from './pages/super/SuperDashboard';
import TenantManagement from './pages/super/TenantManagement';
import SystemConfig from './pages/super/SystemConfig';
import AuditLog from './pages/super/AuditLog';
import Backup from './pages/super/Backup';
import TenantDashboard from './pages/tenant/TenantDashboard';
import TenantUserManagement from './pages/tenant/TenantUserManagement';
import TenantKBManagement from './pages/tenant/TenantKBManagement';
import TenantOps from './pages/tenant/TenantOps';
import TenantQALog from './pages/tenant/TenantQALog';
import KBContentManagement from './pages/maintainer/KBContentManagement';
import KBOptimization from './pages/maintainer/KBOptimization';
import ChatPage from './pages/user/ChatPage';

const roleHome: Record<Role, string> = {
  super: '/super/dashboard',
  tenantAdmin: '/tenant/dashboard',
  maintainer: '/maintainer/content',
  user: '/chat'
};

const RoleGuard = ({ roles, role, children }: { roles: Role[]; role: Role; children: JSX.Element }) => {
  if (roles.includes(role)) return children;
  return <Result status="403" title="无访问权限" subTitle="当前账号未被授权访问此页面" />;
};

const RequireAuth = ({ authed, children }: { authed: boolean; children: JSX.Element }) => {
  const location = useLocation();
  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};

const App = () => {
  const [role, setRole] = useState<Role>('super');
  const [authed, setAuthed] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={(nextRole) => { setRole(nextRole); setAuthed(true); }} />} />
      <Route
        element={
          <RequireAuth authed={authed}>
            <LayoutShell role={role} onRoleChange={setRole} />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to={roleHome[role]} replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/super/dashboard"
          element={
            <RoleGuard roles={['super']} role={role}>
              <SuperDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/super/tenants"
          element={
            <RoleGuard roles={['super']} role={role}>
              <TenantManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/super/config"
          element={
            <RoleGuard roles={['super']} role={role}>
              <SystemConfig />
            </RoleGuard>
          }
        />
        <Route
          path="/super/audit"
          element={
            <RoleGuard roles={['super']} role={role}>
              <AuditLog />
            </RoleGuard>
          }
        />
        <Route
          path="/super/backup"
          element={
            <RoleGuard roles={['super']} role={role}>
              <Backup />
            </RoleGuard>
          }
        />
        <Route
          path="/tenant/dashboard"
          element={
            <RoleGuard roles={['super', 'tenantAdmin']} role={role}>
              <TenantDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/tenant/users"
          element={
            <RoleGuard roles={['super', 'tenantAdmin']} role={role}>
              <TenantUserManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/tenant/kb"
          element={
            <RoleGuard roles={['super', 'tenantAdmin', 'maintainer']} role={role}>
              <TenantKBManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/tenant/ops"
          element={
            <RoleGuard roles={['super', 'tenantAdmin']} role={role}>
              <TenantOps />
            </RoleGuard>
          }
        />
        <Route
          path="/tenant/qa"
          element={
            <RoleGuard roles={['super', 'tenantAdmin']} role={role}>
              <TenantQALog />
            </RoleGuard>
          }
        />
        <Route
          path="/maintainer/content"
          element={
            <RoleGuard roles={['super', 'tenantAdmin', 'maintainer']} role={role}>
              <KBContentManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/maintainer/optimization"
          element={
            <RoleGuard roles={['super', 'tenantAdmin', 'maintainer']} role={role}>
              <KBOptimization />
            </RoleGuard>
          }
        />
        <Route
          path="/chat"
          element={
            <RoleGuard roles={['super', 'tenantAdmin', 'maintainer', 'user']} role={role}>
              <ChatPage />
            </RoleGuard>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
