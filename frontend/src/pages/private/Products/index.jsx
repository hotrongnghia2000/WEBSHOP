import React from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import icons from "../../../icons";
function Products() {
  return (
    <div>
      <Breadcrumb pageName="Products" />
      {/* main */}
      <div className="overflow-hidden rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          <Button
            to="/ecomerce/products-add"
            name="Add Products"
            className="flex w-fit items-center bg-pinklight text-white"
          >
            <icons.IconAddCircle className="mr-2 text-xl" />
          </Button>
        </div>

        {/* search */}
        <form className="flex w-fit items-center">
          <span className="mr-2 whitespace-nowrap text-sm">Tìm kiếm:</span>
          <InputField placeholder="Click to search..." />
        </form>

        {/* table */}
        <div className=" overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr role="row" className="border border-gray-100 bg-bgtabletitle">
                <th className="p-4 text-start">
                  <div>
                    <input type="checkbox"></input>
                  </div>
                </th>
                <th className="p-4 text-start">Sản phẩm</th>
                <th className="p-4 text-start">Thương hiệu</th>
                <th className="p-4 text-start">Loại</th>
                <th className="p-4 text-start">Giá</th>
                <th className="p-4 text-start">Tồn kho</th>
                <th className="p-4 text-start">Đã bán</th>
                <th className="p-4 text-start">Trạng thái</th>
                <th className="p-4 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr role="row">
                <td className="p-4">
                  <div>
                    <input type="checkbox"></input>
                  </div>
                </td>
                <td className="p-4">2500 Club Couple</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
