import * as yup from "yup";

export const login = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6)
    .max(16)
    .required()
    .matches(
      "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&+=])",
      "mật khẩu phải chứa cả chữ, số và ký tự đặc biệt",
    ),
});

export const register = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6)
    .max(16)
    .required()
    .matches(
      "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&+=])",
      "mật khẩu phải chứa cả chữ, số và ký tự đặc biệt",
    ),
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "mật khẩu nhập lại không khớp"),
  address: yup.string().required(),
});
export const changePassword = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6)
    .max(16)
    .required()
    .matches(
      "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&+=])",
      "mật khẩu phải chứa cả chữ, số và ký tự đặc biệt",
    ),
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "mật khẩu nhập lại không khớp"),
});

export const userCode = yup.object().shape({
  userCode: yup
    .string()
    .required()
    .matches("^[0-9]*$", "trường này phải là số")
    .length(4),
});
