import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import brandApi from "../../../apis/brand";
import categoryApi from "../../../apis/category";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import icons from "../../../icons";
import * as brandSchema from "../../../validators/brand";

const AddBrand = () => {
  const [brands, setBrands] = React.useState([]);
  const [name, setName] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(brandSchema.add),
  });
  const onSubmit = async (data) => {
    await brandApi
      .add(data)
      .then((res) => {
        reset();
        setBrands([]);
        setName("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SUCCESS",
          html: `<strong>${res.data.data.name}</strong> đã được thêm!`,
        });
      })
      .catch((err) => console.log(err));
  };

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
  }, []);
  //
  return (
    <div>
      <Breadcrumb pageName="Brands Add" />
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            label="Tên thương hiệu"
            placeholder="Click to type..."
            fieldId="name"
            validator={register("name")}
            error={errors.name?.message}
            value={name}
            setValue={setName}
          />
          <SelectField
            // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
            control={control}
            label="Chọn các loại sản phẩm của thương hiệu"
            fieldId="categories"
            defaultValue={null}
            options={categories}
            error={errors.categories?.message}
            value={brands}
            setValue={setBrands}
            isMulti
          />
          {/* button submit */}
          <div id="button" className="mt-5 flex w-full flex-col">
            <div className="flex justify-end">
              <Button
                type="submit"
                name={
                  isSubmitting ? (
                    <icons.IconLoading className="animate-spin" />
                  ) : (
                    "Gửi"
                  )
                }
                primary
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
