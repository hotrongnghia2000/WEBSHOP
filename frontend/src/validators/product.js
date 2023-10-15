import * as yup from "yup";

export const add = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().typeError("trường này bắt buộc và phải là số").min(1000),
  inventory: yup.number().typeError("trường này bắt buộc và phải là số").min(0),
  brand_id: yup.string().required(),
  category_id: yup.string().required(),
  thumb: yup.mixed().test("required", "trường này là bắt buộc", (value) => {
    return value && value.length;
  }),
  images: yup.mixed().test("required", "trường này là bắt buộc", (value) => {
    return value && value.length;
  }),
});
export const edit = yup.object().shape({
  // name: yup.string(),
  // price: yup.number().typeError("trường này bắt buộc và phải là số").min(1000),
  // inventory: yup.number().typeError("trường này bắt buộc và phải là số").min(0),
  // brand_id: yup.string(),
  // category_id: yup.string(),
  // thumb: yup.mixed(),
  // images: yup.mixed(),
});
export const rate = yup.object().shape({
  star: yup
    .number()
    .typeError("Trường này bắt buộc và phải là số")
    .min(1)
    .max(5),
});
