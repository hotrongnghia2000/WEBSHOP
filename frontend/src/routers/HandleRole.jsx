import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const HandleRole = () => {
  // outlet là đại diện cho children
  const user = useSelector((state) => state.adminUser);
  return user.current.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" replace={true} />
  );
};
export default HandleRole;
