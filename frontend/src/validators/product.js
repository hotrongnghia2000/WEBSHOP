import * as yup from "yup";

export const add = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().typeError("trường này bắt buộc và phải là số").min(1000),
  inventory: yup.number().typeError("trường này bắt buộc và phải là số").min(0),
  brand: yup.string().required(),
  category: yup.string().required(),
  thumb: yup.mixed().test("required", "trường này là bắt buộc", (value) => {
    return value && value.length;
  }),
  images: yup.mixed().test("required", "trường này là bắt buộc", (value) => {
    return value && value.length;
  }),
});
