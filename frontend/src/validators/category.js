import * as yup from "yup";

export const add = yup.object().shape({
  name: yup.string().required(),
});
