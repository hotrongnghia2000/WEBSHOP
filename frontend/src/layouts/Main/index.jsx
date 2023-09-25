import clsx from "clsx";
import { Outlet } from "react-router-dom";
import Header from "./Header";
function MainLayout() {
  return (
    <div className={clsx("main-layout", "flex", "flex-col", "min-h-screen")}>
      <Header />
      <div className={clsx("page")}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
