import AdminLayout from "../layouts/Admin";
import AddBrand from "../pages/private/AddBrand";
import AddCategory from "../pages/private/AddCategory";
import AddProduct from "../pages/private/AddProduct";
import Brands from "../pages/private/Brands";
import Categories from "../pages/private/Categories";
import Ecomerce from "../pages/private/Ecomerce";
import Orders from "../pages/private/Orders";
import Products from "../pages/private/Products";
import HandleRole from "./handleRole";

export let privateRouter = [
  // mỗi route sẽ có 2 thành phần chính là PATH và ELEMENT
  // nếu route parent không có path, nó sẽ lấy path của route children

  {
    // tham khảo https://reactrouter.com/en/main/components/outlet
    element: <HandleRole />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          // dashboards
          { path: "/dashboards/", element: <Ecomerce /> },
          // ecomerce
          { path: "/ecomerce/brands", element: <Brands /> },
          { path: "/ecomerce/brands-add", element: <AddBrand /> },

          { path: "/ecomerce/categories", element: <Categories /> },
          { path: "/ecomerce/categories-add", element: <AddCategory /> },

          { path: "/ecomerce/products", element: <Products /> },
          { path: "/ecomerce/products-add", element: <AddProduct /> },

          { path: "/ecomerce/orders", element: <Orders /> },
        ],
      },
    ],
  },
];
