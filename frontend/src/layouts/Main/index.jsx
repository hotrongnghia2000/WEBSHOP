import clsx from "clsx";
import { Outlet } from "react-router-dom";
import Header from "./Header";
function MainLayout() {
  return (
    <div
      className={clsx(
        "main-layout",
        "flex",
        "flex-col",
        "relative min-h-screen",
      )}
    >
      <div className="z-10">
        <Header />
      </div>
      <div className="flex justify-center pt-[var(--header-height)]">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
