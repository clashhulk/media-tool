import { Navigate, Outlet, useLocation } from 'react-router-dom';

// const useAuth = () => {
//   return;
// };

const ProtectedRoutes = ({ allowedRoles }) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  //   const isAuth = useAuth();
  const location = useLocation();
  return Suser &&
    Suser.token &&
    !isNaN(Suser.user.id) &&
    allowedRoles.includes(Suser.user.roles[0].id) ? (
    <Outlet />
  ) : Suser && Suser.token && !isNaN(Suser.user.id) === true ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={location.pathname} replace />
  );
};

export default ProtectedRoutes;
