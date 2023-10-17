import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../../../app/user";
import DropdownUser from "./DropdownUser";
import SearchProduct from "./SearchProduct";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    if (user.isExpireLogin)
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Hết phiên đăng nhập",
        html: "Vui lòng đăng nhập lại",
        showConfirmButton: true,
        confirmButtonText: "Xác nhận",
        willClose: () => {
          navigate("/");
          dispatch(logout());
        },
      });
  }, [user.isExpireLogin]);

  return (
    <div className="fixed w-full bg-white">
      <div className="flex justify-center">
        <div className="w-[1200px]">
          <div className="px-6 py-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                <Link
                  to={"/admin-login"}
                  className="ml-2 font-semibold text-[#252C32]"
                >
                  Test Backend
                </Link>
              </div>

              <div className="flex flex-1 items-center">
                <div className="ml-6 flex w-full flex-1 gap-x-3">
                  <SearchProduct />
                  {/* dropdown search results */}
                </div>
              </div>

              <div className="ml-2 flex">
                <div className="flex cursor-pointer items-center gap-x-1 rounded-md px-4 hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">Orders</span>
                </div>
                <div
                  onClick={() => {
                    if (user.isLogged) {
                      navigate("/cart");
                    } else {
                      Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Bạn chưa đăng nhập",
                        html: "Bạn vui lòng đăng nhập để tạo giỏ hàng!",
                      });
                    }
                  }}
                  className="flex cursor-pointer items-center gap-x-1 rounded-md px-4 py-2 hover:bg-gray-100"
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                      {(() => {
                        if (user.current) {
                          return user.current.cart.length;
                        } else {
                          return 0;
                        }
                      })()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">Cart</span>
                </div>

                <DropdownUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
