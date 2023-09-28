import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import brandApi from "../../../apis/brand";
import categoryApi from "../../../apis/category";
import productApi from "../../../apis/product";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import icons from "../../../icons";
import * as productSchema from "../../../validators/product";

function AddProduct() {
  const [categories, setCategories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  //
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(productSchema.add),
  });
  // useFieldArray
  const { fields, append, remove } = useFieldArray({
    name: "desc",
    control,
  });
  // submit
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Đang xử lý",
      html: "Vui lòng chờ trong giây lát!",
      didOpen: () => {
        Swal.showLoading();
      },
      // didClose: () => {
      //   Swal.fire("Timeout", "Xử lý quá hạn, vui lòng thử lại!");
      // },
      // timer: 5000,
      // allowOutsideClick: () => !Swal.isLoading(),
    });
    const formData = new FormData();
    // handle images
    for (const el of data.images) {
      formData.append("images", el);
    }
    // handle thumb
    formData.append("thumb", data.thumb[0]);
    // handle desc
    formData.append("desc", JSON.stringify(data.desc));
    // loại bỏ  thuộc tính type file ra khỏi data
    delete data.thumb;
    delete data.images;
    delete data.desc;
    for (const key in data) {
      formData.append(key, data[key]);
    }
    await productApi.add(formData).then((res) => {
      console.log(res);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "SUCCESS",
        html: "<p>Đã thêm mới thành công!!!<p/>",
        showConfirmButton: true,
        confirmButtonText: "Xác nhận",
      });
    });
  };

  // Gọi api
  React.useEffect(() => {
    (async function () {
      await categoryApi.getAll().then((res) => {
        const data = res.data.data;
        setCategories(
          data.map((el) => ({
            value: el._id,
            label: el.name,
          })),
        );
      });
    })();
    (async function () {
      await brandApi.getAll().then((res) => {
        const data = res.data.data;
        setBrands(
          data.map((el) => ({
            value: el._id,
            label: el.name,
          })),
        );
      });
    })();
  }, []);

  return (
    <div>
      <div>
        <Breadcrumb pageName="Products Add" />
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* khi dùng axios thì không thêm encType="multipart/form-data" */}
          {/* chúng ta sẽ thêm ở file api của axios */}
          <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Tên"
              placeholder="Click to type..."
              fieldId="name"
              validator={register("name")}
              error={errors.name?.message}
              setValue={() => {}}
            />
            <InputField
              label="Giá bán"
              placeholder="Click to type..."
              fieldId="price"
              validator={register("price")}
              error={errors.price?.message}
              setValue={() => {}}
            />
            <InputField
              label="Tồn kho"
              placeholder="Click to type..."
              fieldId="inventory"
              validator={register("inventory")}
              error={errors.inventory?.message}
              setValue={() => {}}
            />

            {/* brand */}
            <SelectField
              // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
              control={control}
              label="Thương hiệu"
              fieldId="brand_id"
              defaultValue={null}
              options={brands}
              error={errors.brand?.message}
              setValue={() => {}}
            />

            {/* category */}
            <SelectField
              // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
              control={control}
              label="Loại"
              fieldId="category_id"
              defaultValue={null}
              options={categories}
              error={errors.category?.message}
              setValue={() => {}}
            />

            {/* thumb */}
            <InputField
              label="Thumb"
              fieldId="thumb"
              type="file"
              validator={register("thumb")}
              error={errors.thumb?.message}
              setValue={() => {}}
            />

            {/* images */}
            <InputField
              label="Images ( có thể chọn nhiều ảnh )"
              fieldId="images"
              type="file"
              multiple
              validator={register("images")}
              error={errors.images?.message}
              setValue={() => {}}
            />

            {/* descs */}
            {fields.map((field, index) => {
              return (
                <section key={index} className="flex gap-2">
                  <InputField
                    label={`Tên thuộc tính ${index + 1}`}
                    fieldId={`descName${index}`}
                    validator={register(`desc.${index}.name`)}
                    setValue={() => {}}
                  />
                  <InputField
                    label={`Nội dung ${index + 1}`}
                    fieldId={`contentName${index}`}
                    validator={register(`desc.${index}.content`)}
                    setValue={() => {}}
                  />
                  <div className="mt-4 flex  flex-col justify-center whitespace-nowrap text-sm">
                    <span>Xóa thuộc tính này</span>
                    <button
                      type="submit"
                      onClick={() => remove(index)}
                      className="flex w-full appearance-none justify-center rounded-sm border border-gray-200 px-4 py-2 placeholder-gray-300 ring-focusborder focus-within:ring-1 focus:outline-none"
                    >
                      <icons.IconMinusCircle className="text-xl text-red-600" />
                    </button>
                    <p className={clsx("h-4")}></p>
                  </div>
                </section>
              );
            })}

            {/* button test array field */}
            <div className="mt-4 flex w-fit  flex-col justify-center whitespace-nowrap text-sm">
              <span>Thêm thuộc tính mới</span>
              <button
                type="button"
                onClick={() => append({ name: "", content: "" })}
                className="flex appearance-none justify-center rounded-sm border border-gray-200 px-4 py-2 placeholder-gray-300 ring-focusborder focus-within:ring-1 focus:outline-none"
              >
                <icons.IconAddCircle className="text-xl text-green-600" />
              </button>
              <p className={clsx("h-4")}></p>
            </div>

            {/* button submit */}
            <div id="button" className="mt-5 flex w-full flex-col">
              <div className="flex justify-end">
                <Button type="submit" name="Gửi" primary className="" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
