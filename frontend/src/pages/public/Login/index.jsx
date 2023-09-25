import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../../apis/user";
import * as userApp from "../../../app/user";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import icons from "../../../icons";
import * as userSchema from "../../../validators/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(userSchema.login) });
  const onSubmit = async (body) => {
    // userApi.login(body) tạo ra một promise, do đó có thể dùng then và catch
    const rs = await userApi
      .login(body)
      .then((res) => {
        const data = res.data.data;
        dispatch(
          userApp.login({
            isLogged: res.status === 200,
            current: res.data.data,
            token: res.data.accessToken,
          }),
        );
        if (data.role === "admin") navigate("/admin");
        else navigate("/home");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SUCCESS",
          html: res.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "ERROR",
          html: err.data.message,
          showConfirmButton: true,
          confirmButtonText: "Xác nhận",
        });
      });
    console.log(rs);
  };
  return (
    <div className="h-screen">
      <div className="bg-gradient-to-br from-green-100 to-white antialiased">
        <div className="container mx-auto px-6">
          <div className="flex h-screen flex-col justify-evenly text-center md:flex-row md:items-center md:text-left">
            <div className="flex h-full w-full flex-col justify-around">
              <h1 className="text-5xl font-bold text-gray-800">Welcome!</h1>
            </div>
            <div className="mx-auto w-full md:mx-0 md:w-full lg:w-9/12">
              <div className="flex w-full flex-col rounded-xl bg-white p-10 shadow-xl">
                <h2 className="mb-5 text-left text-2xl font-bold text-gray-800">
                  Đăng nhập
                </h2>
                <form
                  action=""
                  className="w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <InputField
                    label="Email"
                    placeholder="Vui lòng nhập email"
                    fieldId="email"
                    validator={register("email")}
                    error={errors.email?.message}
                  />
                  <InputField
                    label="Mật khẩu"
                    type="password"
                    placeholder="Vui lòng nhập mật khẩu"
                    fieldId="password"
                    validator={register("password")}
                    error={errors.password?.message}
                  />
                  <div id="button" className="my-5 flex w-full flex-col">
                    <Button type="submit" name="Gửi" primary />
                    <div className="mt-5 flex items-center justify-between">
                      <Link to="/" className="flex text-gray-500">
                        <icons.IconHome className="mr-2 text-xl" />
                        <span>Trang chủ!</span>
                      </Link>
                      <Link
                        to="/change-password"
                        className=" text-center font-medium text-gray-500"
                      >
                        Quên mật khẩu!
                      </Link>
                      <Link
                        to="/register"
                        className=" text-center font-medium text-gray-500"
                      >
                        Đăng ký!
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
