import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

function EditProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [inventory, setInventory] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState({});
  const [brands, setBrands] = React.useState([]);
  const [brandValue, setBrandValue] = React.useState({});
  const [product, setProduct] = React.useState({});
  const [thumb, setThumb] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  //
  const params = useParams();
  const navigate = useNavigate();
  //
  const {
    register,
    handleSubmit,
    control,
    getFieldState,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(productSchema.edit),
    defaultValues: { price },
  });
  // console.log(getFieldState("brand_id"));
  // useFieldArrays
  const { fields, append, remove, replace } = useFieldArray({
    name: "desc",
    control,
  });
  // submit
  const onSubmit = async (data) => {
    for (const key in data)
      Swal.fire({
        title: "Đang xử lý",
        html: "Vui lòng chờ trong giây lát!",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const formData = new FormData();
    if (getFieldState("images").isDirty) {
      for (const el of data.images) {
        formData.append("images", el);
      }
    }
    if (getFieldState("thumb").isDirty) {
      for (const el of data.thumb) {
        formData.append("thumb", el);
      }
    }
    if (data.desc) formData.append("desc", JSON.stringify(data.desc));
    delete data.ratings;
    delete data.comments;
    delete data.thumb;
    delete data.images;
    delete data.desc;
    console.log(data);
    for (const key in data) {
      formData.append(key, data[key]);
    }
    await productApi.update(formData, params.id).then((res) => {
      const data = res.data.data;
      setDesc(data.desc);
      setImages(data.images);
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "SUCCESS",
        html: "<p>Đã cập nhật thành công thành công!!!<p/>",
        showConfirmButton: true,
        confirmButtonText: "Xác nhận",
      }).then((result) => {});
    });
  };

  // effect chạy 1 lần duy nhất
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
    (async function () {
      await productApi.getOne(params.id).then((res) => {
        const data = res.data.data;
        setName(data.name);
        setPrice(data.price);
        setInventory(data.inventory);
        setBrandValue({ value: data.brand_id._id, label: data.brand_id.name });
        setCategoryValue({
          value: data.category_id._id,
          label: data.category_id.name,
        });
        setProduct(data);
        if (!fields.length) {
          append(data.desc, {
            // tắt focus input cuối cùng được thêm vào
            shouldFocus: false,
          });
          setDesc(data.desc);
        }
        setImages(data.images);
        setThumb(data.thumb[0].path);

        // sửa lại giá trị do populate biến nó thành một object
        data.brand_id = data.brand_id._id;
        data.category_id = data.category_id._id;
        // set các giá trị default nếu không chỉnh sửa
        for (const key in data) {
          setValue(key, data[key]);
        }
      });
    })();
  }, []);

  return (
    <div>
      <div>
        <Breadcrumb pageName="Products Edit" />
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* khi dùng axios thì không thêm encType="multipart/form-data" */}
          {/* chúng ta sẽ thêm ở file api của axios */}
          <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              control={control}
              label="Tên"
              placeholder="Click to type..."
              fieldId="name"
              validator={register("name")}
              error={errors.name?.message}
              value={name}
              setValue={setName}
              isDirty={getFieldState("name").isDirty}
            />
            <InputField
              control={control}
              label="Giá bán"
              placeholder="Click to type..."
              fieldId="price"
              validator={register("price")}
              error={errors.price?.message}
              value={price}
              setValue={setPrice}
              isDirty={getFieldState("price").isDirty}
            />
            <InputField
              control={control}
              label="Tồn kho"
              placeholder="Click to type..."
              fieldId="inventory"
              validator={register("inventory")}
              error={errors.inventory?.message}
              value={inventory}
              setValue={setInventory}
              isDirty={getFieldState("inventory").isDirty}
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
              setValue={setBrandValue}
              value={brandValue}
              isDirty={getFieldState("brand_id").isDirty}
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
              setValue={setCategoryValue}
              value={categoryValue}
              isDirty={getFieldState("category_id").isDirty}
            />

            <div className="flex gap-2">
              <div className="w-50">
                <img src={thumb} />
              </div>
            </div>
            {/* thumb */}
            <InputField
              control={control}
              label="Thumb"
              fieldId="thumb"
              type="file"
              validator={register("thumb")}
              error={errors.thumb?.message}
              setFiles={setThumb}
              // isDirty={getFieldState("thumb").isDirty}
              // value={thumb}
            />

            {/* images ban đầu là lấy từ cloudinary nên dùng el.path */}
            {/* images sau khi onChange sẽ dùng URL.createObjectURL để lấy giá trị vừa thay đổi */}
            <div className="flex items-end gap-2">
              {images.map((el, index) => (
                <div key={index} className="w-50">
                  <img src={el.path || el} />
                </div>
              ))}
            </div>
            {/* images */}
            <InputField
              control={control}
              label="Images ( có thể chọn nhiều ảnh )"
              fieldId="images"
              type="file"
              multiple
              validator={register("images")}
              error={errors.images?.message}
              setFiles={setImages}
              // isDirty={getFieldState("images").isDirty}
              // value={images}
            />

            {/* descs */}
            {fields.map((field, index) => {
              return (
                <section key={index} className="flex gap-2">
                  <InputField
                    control={control}
                    label={`Tên thuộc tính ${index + 1}`}
                    fieldId={`descName${index}`}
                    validator={register(`desc.${index}.name`)}
                    setValue={() => {}}
                  />
                  <InputField
                    control={control}
                    label={`Nội dung ${index + 1}`}
                    fieldId={`contentName${index}`}
                    validator={register(`desc.${index}.content`)}
                    setValue={() => {}}
                  />
                  <div className="mt-4 flex  flex-col justify-center whitespace-nowrap text-sm">
                    <span>Xóa thuộc tính này</span>
                    <button
                      type="button"
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
                onClick={() => {
                  replace(desc);
                  append({ name: "", content: "" });
                }}
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

export default EditProduct;
