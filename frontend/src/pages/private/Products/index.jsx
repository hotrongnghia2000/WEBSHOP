import clsx from "clsx";
import moment from "moment";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import productApi from "../../../apis/product";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import icons from "../../../icons";
function Brands() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [checks, setChecks] = React.useState([]);
  const {
    register,
    handleSubmit,
    control,
    // getFieldState,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const onSubmitDeleteCheck = async (data) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa ?",
      text: "Bạn sẽ không thể khôi phục lại điều này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy bỏ",
      confirmButtonText: "Xác nhận xóa",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await productApi
          .deleteChecks(data)
          .then(() => {
            setProducts((prev) =>
              prev.filter((el) => !data.checks.includes(el._id)),
            );
            setChecks([]);
            Swal.fire(
              `Bạn đã xóa thành công`,
              `Các mục bạn chọn đã được xóa`,
              "success",
            );
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // function
  const handleCheckAll = (e) => {
    setIsCheckAll(e.target.checked);
    setChecks(products.map((el) => el._id));
    setValue(
      "checks",
      products.map((el) => el._id),
    );
    if (isCheckAll) {
      setChecks([]);
      setValue("checks", []);
    }
  };
  const handleCheck = (e) => {
    // giá sử ta truyền cho input một checked = false, vậy khi ta click nó sẽ trả về một !checked, tức giá trị true
    // tuy nhiên, nếu giá trị truyền cho input không thay đổi, thì khi ta click lần nữa vẫn nhận giá trị true như lần trước đó
    const { value, checked } = e.target;
    setChecks((prev) => [...prev, value]);
    if (!checked) setChecks(checks.filter((el) => el !== value));
  };

  //
  const del = async (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa ?",
      text: "Bạn sẽ không thể khôi phục lại điều này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy bỏ",
      confirmButtonText: "Xác nhận xóa",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await productApi
          .delete(id)
          .then((res) => {
            setProducts((prev) => prev.filter((el) => el._id !== id));
            Swal.fire(
              `Bạn đã xóa thành công`,
              `<strong>${res.data.data.name}</strong> đã được xóa`,
              "success",
            );
          })
          .catch((err) => console.log(err));
      }
    });
  };

  //
  React.useEffect(() => {
    (async function () {
      await productApi
        // getAll phải có dấu ngoặc () đi kèm
        .getAll()
        .then((res) => {
          const data = res.data.data;
          setProducts(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  //
  React.useEffect(() => {
    if (products.length > 0) {
      if (products.length === checks.length) setIsCheckAll(true);
      else setIsCheckAll(false);
    } else setIsCheckAll(false);
  }, [checks]);
  return (
    <div>
      <Breadcrumb pageName="Brands" />
      {/* main */}
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Add */}
        <div>
          <Button
            to="/ecomerce/products-add"
            name="Add Product"
            className="flex w-fit items-center bg-pinklight text-white"
          >
            <icons.IconAddCircle className="mr-2 text-xl" />
          </Button>
        </div>
        {/* search */}
        <div className="flex items-center justify-between">
          <form className="flex w-fit items-center">
            <span className="mr-2 whitespace-nowrap text-sm">Tìm kiếm:</span>
            <InputField placeholder="Click to search..." className="!p-1" />
          </form>
          <Button
            type="submit"
            onClick={() => formRef.current.requestSubmit()}
            className={clsx(" flex items-center", {
              hidden: checks.length < 1 || products.length < 1,
            })}
          >
            <icons.IconDelete className="text-2xl text-danger" />
            <span className="ml-2">Xóa các mục đã chọn</span>
          </Button>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <form ref={formRef} onSubmit={handleSubmit(onSubmitDeleteCheck)}>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr
                  role="row"
                  className="border border-gray-100 bg-bgtabletitle"
                >
                  <th className="p-4 text-start">
                    <div className="">
                      <input
                        type="checkbox"
                        className=" accent-pink-500"
                        name="selectAll"
                        checked={isCheckAll}
                        onChange={(e) => handleCheckAll(e)}
                      />
                    </div>
                  </th>
                  <th className="p-4 text-start">Ngày thêm</th>
                  <th className="p-4 text-start">Sản phẩm</th>
                  <th className="p-4 text-start">Giá</th>
                  <th className="p-4 text-start">Đã bán</th>
                  <th className="p-4 text-start">Tồn kho</th>
                  <th className="p-4 text-start">Trạng thái</th>
                  <th className="p-4 text-start">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((el, index) => (
                  <tr role="row" key={index} className="border-b">
                    <td className="p-4">
                      <div>
                        <input
                          {...register("checks")}
                          type="checkbox"
                          value={el._id}
                          className=" accent-pink-500"
                          onChange={(e) => {
                            handleCheck(e);
                          }}
                          checked={checks.includes(el._id)}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      {moment(el.createdAt).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <div className="h-12 w-12">
                          <img src={el.thumb[0].path} />
                        </div>
                        <span>{el.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{el.price}</td>
                    <td className="p-4">{el.sold}</td>
                    <td className="p-4">{el.inventory}</td>
                    <td className="p-4">Active</td>
                    <td className="p-4">
                      <div className="whitespace-nowrap text-gray-400">
                        <button
                          className="mr-2"
                          type="button"
                          onClick={() => {
                            navigate(`../ecomerce/products-edit/${el._id}`);
                          }}
                        >
                          <icons.IconBxsEdit className="text-xl" />
                        </button>
                        <button
                          className="mr-2"
                          type="button"
                          onClick={() => del(el._id)}
                        >
                          <icons.IconDelete className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Brands;
