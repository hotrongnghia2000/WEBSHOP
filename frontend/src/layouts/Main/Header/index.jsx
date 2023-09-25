import clsx from "clsx";
import react from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import icons from "../../../icons";
const Header = () => {
  const user = useSelector((state) => state.user);
  const [searchValue, setSearchValue] = react.useState("");
  const handleSearchValue = (e) => {
    const value = e.target.value;
    // if value not start with a space, value will be updated
    if (!value.startsWith(" ")) {
      setSearchValue(value);
    }
  };
  return (
    <div className="fixed h-screen w-full">
      <div className="bg-white">
        <div className="border px-6 py-3">
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
              <span className="ml-2 font-semibold text-[#252C32]">
                Website bán hàng
              </span>
            </div>

            <div className="ml-6 flex flex-1 gap-x-3">
              <div className="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-[#4094F7] px-4 py-2 text-white hover:bg-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="text-sm font-medium">Categories</span>
              </div>
              <form>
                <div className="relative flex h-full w-full items-center rounded-md bg-whiten">
                  <input
                    type="text"
                    className="h-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
                    placeholder="Bạn muốn tìm gì hôm nay ?"
                    value={searchValue}
                    onChange={handleSearchValue}
                  />
                  <button
                    className={clsx(
                      "active:bg-[#1618230f]",
                      "hover:bg-[#16182308]",
                      "rounded-md",
                      "h-full",
                      "px-3",
                      {
                        "text-[#A3A3A8]": !searchValue,
                      },
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <icons.IconBxSearch className="text-2xl" />
                  </button>
                </div>
              </form>
            </div>

            <div className="ml-2 flex">
              <div className="flex cursor-pointer items-center gap-x-1 rounded-md px-4 py-2 hover:bg-gray-100">
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
              <div className="flex cursor-pointer items-center gap-x-1 rounded-md px-4 py-2 hover:bg-gray-100">
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
                    3
                  </span>
                </div>
                <span className="text-sm font-medium">Cart</span>
              </div>

              <Link to="/login" className={clsx({ hidden: user.current })}>
                <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border px-4 py-2 hover:bg-gray-100">
                  <span className="text-sm font-medium">Sign in</span>
                </div>
              </Link>
              <div className={clsx({ hidden: !user.current })}>
                <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border px-4 py-2 hover:bg-gray-100">
                  <span className="text-sm font-medium">
                    Hi, {user.current.email?.split("@")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-x-2 px-2 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Việt Nam</span>
            </div>

            <div className="flex gap-x-8">
              <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100">
                Bán chạy nhất
              </span>
              <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100">
                Sản phẩm mới
              </span>
              <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100">
                Điện thoại
              </span>
              <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100">
                Laptop
              </span>
              <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100">
                Máy tính bảng
              </span>
            </div>

            <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
