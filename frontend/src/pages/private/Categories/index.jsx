import clsx from "clsx";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import categoryApi from "../../../apis/category";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import icons from "../../../icons";
function Categories() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [checkCategories, setCheckCategories] = React.useState([]);
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
    console.log(data);
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
        await categoryApi
          .deleteChecks(data)
          .then((res) => {
            console.log(res);
            setCategories((prev) =>
              prev.filter((el) => !data.checkCategories.includes(el._id)),
            );
            setCheckCategories([]);
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
    setCheckCategories(categories.map((el) => el._id));
    setValue(
      "checkCategories",
      categories.map((el) => el._id),
    );
    if (isCheckAll) {
      setCheckCategories([]);
      setValue("checkCategories", []);
    }
  };
  const handleCheck = (e) => {
    // giá sử ta truyền cho input một checked = false, vậy khi ta click nó sẽ trả về một !checked, tức giá trị true
    // tuy nhiên, nếu giá trị truyền cho input không thay đổi, thì khi ta click lần nữa vẫn nhận giá trị true như lần trước đó
    const { value, checked } = e.target;
    setCheckCategories((prev) => [...prev, value]);
    if (!checked)
      setCheckCategories(checkCategories.filter((el) => el !== value));
  };

  //
  const deleteCategory = async (id) => {
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
        await categoryApi
          .delete(id)
          .then((res) => {
            setCategories((prev) => prev.filter((el) => el._id !== id));

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
      await categoryApi
        // getAll phải có dấu ngoặc () đi kèm
        .getAll()
        .then((res) => {
          const data = res.data.data;
          setCategories(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  //
  React.useEffect(() => {
    if (categories.length > 0)
      if (categories.length === checkCategories.length) setIsCheckAll(true);
      else setIsCheckAll(false);
  }, [checkCategories]);
  return (
    <div>
      <Breadcrumb pageName="Brands" />
      {/* main */}
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Add */}
        <div>
          <Button
            to="/ecomerce/categories-add"
            name="Add Category"
            className="flex w-fit items-center bg-pinklight text-white"
          >
            <icons.IconAddCircle className="mr-2 text-xl" />
          </Button>
        </div>
        {/* search */}
        <div className="flex items-center justify-between">
          <form className="flex w-fit items-center">
            <span className="mr-2 whitespace-nowrap text-sm">Tìm kiếm:</span>
            <InputField
              control={control}
              placeholder="Click to search..."
              className="!p-1"
              setValue={() => {}}
              fieldId="category-search"
            />
          </form>
          <Button
            type="submit"
            onClick={() => formRef.current.requestSubmit()}
            className={clsx(" flex items-center", {
              hidden: checkCategories.length < 1,
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
                  <th className="p-4 text-start">Tên loại sản phẩm</th>
                  <th className="p-4 text-start">
                    Các thương hiệu có loại sản phẩm này
                  </th>
                  <th className="p-4 text-start">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((el, index) => (
                  <tr role="row" key={index} className="border-b">
                    <td className="p-4">
                      <div>
                        <input
                          {...register("checkCategories")}
                          type="checkbox"
                          value={el._id}
                          className=" accent-pink-500"
                          onChange={(e) => {
                            handleCheck(e);
                          }}
                          checked={checkCategories.includes(el._id)}
                        />
                      </div>
                    </td>
                    <td className="p-4">{el.name}</td>
                    <td className="p-4">
                      <div className="flex min-w-[200px] flex-wrap">
                        {el.brands?.map((el, index) => (
                          <div
                            key={index}
                            className="mr-1 mt-1 w-fit rounded-md bg-gray-200 px-2 py-1"
                          >
                            {el.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="whitespace-nowrap text-gray-400">
                        <button
                          className="mr-2"
                          type="button"
                          onClick={() => {
                            navigate(`../ecomerce/categories-edit/${el._id}`);
                          }}
                        >
                          <icons.IconBxsEdit className="text-xl" />
                        </button>
                        <button
                          type="button"
                          className="mr-2"
                          onClick={() => {
                            deleteCategory(el._id);
                          }}
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

export default Categories;
