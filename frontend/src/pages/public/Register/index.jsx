import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../../apis/user";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import Modal from "../../../components/Modal";
import icons from "../../../icons";
import * as userSchema from "../../../validators/user";

const Register = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", resolver: yupResolver(userSchema.register) });
  const onSubmit = async (body) => {
    await userApi
      .register(body)
      .then((res) => {
        console.log(res);
        let timerInterval;
        Swal.fire({
          title: "Xác nhận tài khoản",
          input: "text",
          inputLabel: "Mã xác nhận",
          html:
            res.data.message +
            `<p>Thời gian còn lại: <b class="text-red-600">60<b/></p>`,
          inputAttributes: {
            autocapitalize: "off",
          },

          showCancelButton: true,
          cancelButtonText: "Hủy",
          confirmButtonText: "Gửi mã",
          timer: 60000,
          timerProgressBar: true,
          didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Math.round(Swal.getTimerLeft() / 1000);
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },

          inputValidator: async (value) => {
            return await userSchema.userCode
              .validate({ userCode: value })
              // không có lỗi gì thì đến preConfirm
              .then(() => {})
              // chỉ khi lỗi mới trả về
              .catch((err) => {
                return err.message;
              });
          },
          showLoaderOnConfirm: true,
          preConfirm: async (value) => {
            await userApi
              .finishRegistration({ userCode: value })
              .then(() => {})
              .catch((err) => {
                Swal.showValidationMessage(`${err.data?.message}`);
              });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isDismissed)
            if (result.dismiss === "timer")
              Swal.fire({
                icon: "error",
                title: "Đăng ký thất bại",
                html: "<p>Mã xác nhận đã hết hạn<p/>Vui lòng dùng đăng ký lại!",
                confirmButtonText: "Đồng ý",
                allowOutsideClick: false,
              });
            else
              Swal.fire({
                icon: "error",
                title: "Đăng ký thất bại",
                html: "<p>Bạn đã hủy đăng ký!<p/>",
                confirmButtonText: "Xác nhận",
                allowOutsideClick: false,
                willClose: () => {
                  reset();
                },
              });
          if (result.isConfirmed)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "SUCCESS",
              html: "<p>Tài khoản đã được đăng ký<p/>Bạn có muốn đến trang đăng nhập ?",
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              showCancelButton: true,
              cancelButtonText: "Hủy",
            }).then((rs) => {
              if (rs.isConfirmed) navigate("/login");
              else reset();
            });
        });
      })
      .catch((err) => {
        if (err.status === 400)
          Swal.fire({
            icon: "error",
            title: "Đã xảy ra lỗi",
            html: "<p>Tài khoản email đã được sử dụng<p/>Vui lòng dùng tài khoản email khác!",
            confirmButtonText: "Đồng ý",
            allowOutsideClick: false,
          });
      });

    //
  };

  React.useEffect(() => {
    isSubmitting &&
      Swal.fire({
        title: "Đang xử lý",
        html: "Vui lòng chờ trong giây lát!",
        didOpen: () => {
          Swal.showLoading();
        },
      });
  }, [isSubmitting]);

  return (
    <div className="h-screen">
      {isOpen && (
        <Modal
          mes="Thời hạn đăng ký đã hết, bạn có muốn đăng ký lại ?"
          setIsOpen={setIsOpen}
        />
      )}
      {/* {confirm.isOpen && (
        <ConfirmCode setConfirm={setConfirm} mes={confirm.mes} />
      )} */}
      <div className="bg-gradient-to-br from-green-100 to-white antialiased">
        <div className="container mx-auto px-6">
          <div className="flex h-screen flex-col justify-evenly text-center md:flex-row md:items-center md:text-left">
            <div className="flex h-full w-full flex-col justify-around">
              <h1 className="text-5xl font-bold text-gray-800">Welcome!</h1>
            </div>
            <div className="mx-auto w-full md:mx-0 md:w-full lg:w-9/12">
              <div className="flex w-full flex-col rounded-xl bg-white p-6 shadow-xl">
                <h2 className=" text-left text-2xl font-bold text-gray-800">
                  Đăng ký
                </h2>
                <form
                  action=""
                  className="w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <InputField
                    control={control}
                    label="Email"
                    placeholder="Vui lòng nhập email"
                    fieldId="email"
                    validator={register("email")}
                    error={errors.email?.message}
                  />
                  <InputField
                    control={control}
                    label="Mật khẩu"
                    type="password"
                    placeholder="Vui lòng nhập mật khẩu"
                    fieldId="password"
                    validator={register("password")}
                    error={errors.password?.message}
                  />
                  <InputField
                    control={control}
                    label="Xác nhận mật khẩu"
                    type="password"
                    placeholder="Vui lòng nhập lại mật khẩu"
                    fieldId="corfirm"
                    validator={register("confirm")}
                    error={errors.confirm?.message}
                  />
                  <InputField
                    control={control}
                    label="Địa chỉ"
                    placeholder="Vui lòng nhập địa chỉ"
                    fieldId="address"
                    validator={register("address")}
                    error={errors.address?.message}
                  />
                  <div id="button" className="my-5 flex w-full flex-col">
                    <Button
                      type="submit"
                      name={
                        isSubmitting ? (
                          <icons.IconBxSearch className="animate-spin" />
                        ) : (
                          "Gửi"
                        )
                      }
                      primary
                    />

                    <div className="mt-2 flex items-center justify-between">
                      <Link to="/" className="flex text-gray-500">
                        <icons.IconHome className="mr-2 text-xl" />
                        <span>Trang chủ!</span>
                      </Link>
                      <Link
                        to="/login"
                        className=" text-center font-medium text-gray-500"
                      >
                        Đăng nhập!
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

export default Register;
