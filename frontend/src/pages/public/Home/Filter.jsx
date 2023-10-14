import React from "react";
import { useForm } from "react-hook-form";
import brandApi from "../../../apis/brand";
import categoryApi from "../../../apis/category";
import Button from "../../../components/Button";
import SelectField from "../../../components/SelectField";

const sortOptions = [
  { label: "Giá tăng dần", value: "price" },
  { label: "Giá giảm dần", value: "-price" },
  { label: "Tên theo thứ tự A-Z", value: "-name" },
  { label: "Tên theo thứ tự Z-A", value: "name" },
];
const Filter = (props) => {
  const [categories, setCategories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);

  const {
    register,
    handleSubmit,
    control,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(productSchema.add),
  });

  // function
  const onSubmit = async (data) => {
    for (const key in data) {
      if (!data[key]) delete data[key];
    }

    props.setQueries((prev) => ({ ...prev, ...data, page: 1 }));
  };

  //
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
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-4">
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
            isMulti
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
            isMulti
          />
          {/* sort */}
          <SelectField
            // control được thêm vào để dùng cùng với controller, custom lại những components như react-select
            control={control}
            label="Sắp xếp"
            fieldId="sort"
            defaultValue={null}
            options={sortOptions}
            error={errors.sort?.message}
            setValue={() => {}}
          />
        </div>
        <div className="mb-2 flex justify-center">
          <Button type="submit" primary className="py-[10px]">
            Áp dụng
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
