import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../../apis/user";
import { getCurrent, refreshToken } from "../../../app/user/asyncActions";
import Button from "../../../components/Button";
import icons from "../../../icons";
import { checkTokenIsExpire, delay, splitPrice } from "../../../utils/helpers";

function Cart() {
  //
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) return;
    await userApi
      .updateCart({ productId: id, quantity })
      .then((res) => {
        dispatch(getCurrent());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delAllCart = async () => {
    if (user.isLogged) {
      if (checkTokenIsExpire(user.token)) {
        dispatch(refreshToken());
        await delay(100);
      }
      // chờ đợi dữ liệu ghi vào localstorage từ redux persist bằng setTimeout 100ms

      await userApi
        .delCart()
        .then((res) => dispatch(getCurrent()))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const delCart = async (id) => {
    if (user.isLogged) {
      if (checkTokenIsExpire(user.token)) {
        dispatch(refreshToken());
        // chờ đợi dữ liệu ghi vào localstorage từ redux persist bằng setTimeout 100ms
        await delay(100);
      }

      await userApi
        .delCart({ id })
        .then((res) => dispatch(getCurrent()))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.effect;
  React.useEffect(() => {
    if (user.current.cart.length === 0)
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Giỏ hàng trống!",
        html: "Bạn vui lòng thêm sản phẩm vào giỏ hàng!",
        showConfirmButton: true,
        confirmButtonText: "Xác nhận",
      }).then((result) => {
        if (result.isConfirmed) navigate("/");
      });
  }, [user.current.cart.length]);
  return (
    <div className="w-[1200px] px-6 py-6 text-sm ">
      {/* list products */}
      <div className=" flex flex-wrap bg-white">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr role="row" className="border border-gray-100">
              <th className="p-4 text-start">Sản phẩm</th>
              <th className="p-4 text-start">Giá</th>
              <th className="p-4 text-start">Số lượng</th>
              <th className="p-4 text-start">Tổng</th>
              <th className="p-4 text-start">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {user?.current.cart.map((el, index) => {
              return (
                <tr role="row" key={index} className="">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12">
                        <img src={el.product.thumb[0].path} />
                      </div>
                      <span>{el.product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-red-600">
                    {splitPrice(el.product.price)} VNĐ
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(el.product._id, el.quantity - 1)
                        }
                      >
                        <icons.IconMinus className="text-xl text-red-600" />
                      </button>
                      <span className="px-3">{el.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(el.product._id, el.quantity + 1)
                        }
                      >
                        <icons.IconPlus className="text-xl text-green-600" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-red-600">
                    {splitPrice(el.product.price * el.quantity)} VNĐ
                  </td>
                  <td className="p-4">
                    <div className="whitespace-nowrap text-gray-400">
                      <button
                        className="mr-2"
                        type="button"
                        onClick={() => delCart(el.product._id)}
                      >
                        <icons.IconDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/*  */}
      <div className="mt-2 flex w-full justify-between">
        <Button primary onClick={() => navigate("/")}>
          Tiếp tục mua hàng
        </Button>
        <Button danger onClick={() => delAllCart()}>
          Xóa giỏ hàng
        </Button>
      </div>
      {/* tổng tiền phải thanh toán */}
      <div className="mt-2 flex justify-between">
        <div></div>
        <div className="bg-white p-8">
          <div className="text-base">
            <span className="font-bold">Tổng đơn hàng: </span>
            <span className="font-bold text-red-600">
              {splitPrice(
                user.current.cart.reduce((total, el) => {
                  return total + el.product.price * el.quantity;
                }, 0),
              )}{" "}
              VNĐ
            </span>
          </div>
          <Button warning className="mt-8">
            Đặt hàng và thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
