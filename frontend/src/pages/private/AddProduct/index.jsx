import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import icons from "../../../icons";
import * as productSchema from "../../../validators/product";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function AddProduct() {
  const {
    register,
    handleSubmit,
    control,
    // getFieldState,
    // setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(productSchema.add),
    // defaultValues: {
    //   desc: [{ name: "", content: "" }],
    // },
  });
  // useFieldArray
  const { fields, append, remove } = useFieldArray({
    name: "desc",
    control,
  });

  // submit
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("thumb", data.thumb[0]);
    data = { ...data, thumb: data.thumb[0].name };
    // formData.append("recipe", JSON.stringify(data));
    console.log(formData);
    // khi gọi api sẽ truyền formData vào api
    // upload nhiều ảnh thì append nhiều file vào
  };

  // Gọi api
  React.useEffect(() => {}, []);

  return (
    <div>
      <div>
        <Breadcrumb pageName="Products Add" />
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Tên"
              placeholder="Click to type..."
              fieldId="name"
              validator={register("name")}
              error={errors.name?.message}
            />
            <InputField
              label="Giá bán"
              placeholder="Click to type..."
              fieldId="price"
              validator={register("price")}
              error={errors.price?.message}
            />
            <InputField
              label="Tồn kho"
              placeholder="Click to type..."
              fieldId="inventory"
              validator={register("inventory")}
              error={errors.inventory?.message}
            />

            {/* brand */}
            <SelectField
              // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
              control={control}
              label="Thương hiệu"
              fieldId="brand"
              defaultValue={null}
              options={options}
              error={errors.brand?.message}
            />

            {/* category */}
            <SelectField
              // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
              control={control}
              label="Loại"
              fieldId="category"
              defaultValue={null}
              options={options}
              error={errors.category?.message}
            />

            {/* thumb */}
            <InputField
              label="Thumb"
              fieldId="thumb"
              type="file"
              validator={register("thumb")}
              error={errors.thumb?.message}
            />

            {/* images */}
            <InputField
              label="Images ( có thể chọn nhiều ảnh )"
              fieldId="images"
              type="file"
              multiple
              validator={register("images")}
              error={errors.images?.message}
            />

            {/* descs */}
            {fields.map((field, index) => {
              return (
                <section key={index} className="flex gap-2">
                  <InputField
                    label={`Tên thuộc tính ${index + 1}`}
                    fieldId={`descName${index}`}
                    validator={register(`desc.${index}.name`)}
                  />
                  <InputField
                    label={`Nội dung ${index + 1}`}
                    fieldId={`contentName${index}`}
                    validator={register(`desc.${index}.content`)}
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
                type="submit"
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
