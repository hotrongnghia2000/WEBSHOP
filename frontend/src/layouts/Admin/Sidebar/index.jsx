import clsx from "clsx";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import icons from "../../../icons";
import SidebarLinkGroup from "./SidebarLinkGroup";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  // khi sidebar ẩn đi, sẽ hiện lên nút ấn để hiện lại sidebar
  // thay vì ấn vào nút này, ta có thể click outsite sidebar để đóng
  const sidebar = React.useRef();
  const trigger = React.useRef();
  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  // kết thúc đoạn code click outsite to close

  // cái này cũng chưa rõ để làm gì ?
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = React.useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );
  // chưa biết thêm sidebar-expland vào body để làm gì ?
  React.useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    <aside
      ref={sidebar}
      // lg:static khi đạt lg, sẽ ghi đè absolute
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-200 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <h3 className="p-4 text-white">Welcome Admin</h3>
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block text-white lg:hidden"
        >
          <icons.IconToggleMenu />
        </button>
      </div>
      {/* sidebar header */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboards")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      {/* Dashboards */}
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboards")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <icons.IconDashboard />
                        Dashboards
                        <icons.IconDropdown open={open} />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/dashboards"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Ecommerce
                            </NavLink>
                          </li>
                          <li></li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                      {/* End Dashboards */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("ecomerce")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      {/* Ecommerce */}
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" || pathname.includes("products")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <icons.IconShop className="text-lg" />
                        Ecommerce
                        <icons.IconDropdown open={open} />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="ecomerce/brands"
                              className={({ isActive }) => {
                                return clsx(
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white",
                                  {
                                    "!text-white":
                                      isActive || pathname.includes("brands"),
                                  },
                                );
                              }}
                            >
                              Brands
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="ecomerce/categories"
                              className={({ isActive }) => {
                                console.log();
                                return clsx(
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white",
                                  {
                                    "!text-white":
                                      isActive ||
                                      pathname.includes("categories"),
                                  },
                                );
                              }}
                            >
                              Categories
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/ecomerce/products"
                              className={({ isActive }) => {
                                console.log();
                                return clsx(
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white",
                                  {
                                    "!text-white":
                                      isActive || pathname.includes("products"),
                                  },
                                );
                              }}
                            >
                              Products
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="ecomerce/orders"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Orders
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
