import clsx from "clsx";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import brandApi from "../../../apis/brand";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import icons from "../../../icons";
function Brands() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [brands, setBrands] = React.useState([]);
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [checkBrands, setCheckBrands] = React.useState([]);
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
        await brandApi
          .deleteChecks(data)
          .then(() => {
            setBrands((prev) =>
              prev.filter((el) => !data.checkBrands.includes(el._id)),
            );
            setCheckBrands([]);
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
    setCheckBrands(brands.map((el) => el._id));
    setValue(
      "checkBrands",
      brands.map((el) => el._id),
    );
    if (isCheckAll) {
      setCheckBrands([]);
      setValue("checkBrands", []);
    }
  };
  const handleCheck = (e) => {
    // giá sử ta truyền cho input một checked = false, vậy khi ta click nó sẽ trả về một !checked, tức giá trị true
    // tuy nhiên, nếu giá trị truyền cho input không thay đổi, thì khi ta click lần nữa vẫn nhận giá trị true như lần trước đó
    const { value, checked } = e.target;
    setCheckBrands((prev) => [...prev, value]);
    if (!checked) setCheckBrands(checkBrands.filter((el) => el !== value));
  };

  //
  const deleteBrand = async (id) => {
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
        await brandApi
          .delete(id)
          .then((res) => {
            setBrands((prev) => prev.filter((el) => el._id !== id));
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
      await brandApi
        // getAll phải có dấu ngoặc () đi kèm
        .getAll()
        .then((res) => {
          const data = res.data.data;
          // Sắp xếp các phần tử trong data.categories theo bảng chữ cái
          for (const el of data) {
            // localeCompare so sánh giá trị của a.name và b.name => trả về âm, dương hoặc 0
            el.categories?.sort((a, b) => a.name.localeCompare(b.name));
          }
          setBrands(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  //
  React.useEffect(() => {
    if (brands.length > 0) {
      if (brands.length === checkBrands.length) setIsCheckAll(true);
      else setIsCheckAll(false);
    } else setIsCheckAll(false);
  }, [checkBrands]);
  return (
    <div>
      <Breadcrumb pageName="Brands" />
      {/* main */}
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Add */}
        <div>
          <Button
            to="/ecomerce/brands-add"
            name="Add Brands"
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
              fieldId="brand-search"
              placeholder="Click to search..."
              className="!p-1"
            />
          </form>
          <Button
            type="submit"
            onClick={() => formRef.current.requestSubmit()}
            className={clsx(" flex items-center", {
              hidden: checkBrands.length < 1 || brands.length < 1,
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
                  <th className="p-4 text-start">Tên thương hiệu</th>
                  <th className="p-4 text-start">Các loại của thương hiệu</th>
                  <th className="p-4 text-start">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((el, index) => (
                  <tr role="row" key={index} className="border-b">
                    <td className="p-4">
                      <div>
                        <input
                          {...register("checkBrands")}
                          type="checkbox"
                          value={el._id}
                          className=" accent-pink-500"
                          onChange={(e) => {
                            handleCheck(e);
                          }}
                          checked={checkBrands.includes(el._id)}
                        />
                      </div>
                    </td>
                    <td className="p-4">{el.name}</td>
                    <td className="p-4">
                      <div className="flex min-w-[200px] flex-wrap">
                        {el.categories?.map((el, index) => (
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
                            navigate(`../ecomerce/brands-edit/${el._id}`);
                          }}
                        >
                          <icons.IconBxsEdit className="text-xl" />
                        </button>
                        <button
                          className="mr-2"
                          type="button"
                          onClick={() => deleteBrand(el._id)}
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
