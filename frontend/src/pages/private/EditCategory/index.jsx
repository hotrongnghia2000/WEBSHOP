import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import brandApi from "../../../apis/brand";
import categoryApi from "../../../apis/category";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import icons from "../../../icons";
import * as brandSchema from "../../../validators/brand";

const EditCategory = () => {
  const [values, setValues] = React.useState([]);
  const [name, setName] = React.useState("");
  const [brands, setBrands] = React.useState([]);
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(brandSchema.add),
  });
  const onSubmit = async (data) => {
    console.log(data);
    await categoryApi
      .update(data, params.id)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SUCCESS",
          html: `<strong>${res.data.data.name}</strong> đã được update!`,
        });
      })
      .catch((err) => console.log(err));
  };

  //
  React.useEffect(() => {
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
  //
  React.useEffect(() => {
    (async function () {
      await categoryApi.getOne(params.id).then((res) => {
        const data = res.data.data;
        const values = data.brands?.map((el) => ({
          value: el._id,
          label: el.name,
        }));
        setName(data.name);
        setValues(values);
        //
        setValue("name", data.name);
        setValue("brands", values);
      });
    })();
  }, []);
  return (
    <div>
      <Breadcrumb pageName="Category Edit" />
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            label="Tên loại"
            placeholder="Click to type..."
            fieldId="name"
            validator={register("name")}
            error={errors.name?.message}
            value={name || ""}
            setValue={setName}
          />
          <SelectField
            // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
            control={control}
            label="Chọn các thương hiệu của loại"
            fieldId="brands"
            defaultValue={values}
            options={brands}
            error={errors.brands?.message}
            value={values}
            setValue={setValues}
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

export default EditCategory;
