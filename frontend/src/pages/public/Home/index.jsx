import clsx from "clsx";
import queryString from "query-string";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import productApi from "../../../apis/product";
import userApi from "../../../apis/user";
import { getCurrent, refreshToken } from "../../../app/user/asyncActions";
import icons from "../../../icons";
import {
  checkTokenIsExpire,
  delay,
  paginationArr,
  showStar,
  splitPrice,
} from "../../../utils/helpers";
import Filter from "./Filter";

const Home = () => {
  const [params] = useSearchParams();
  const { category } = useParams();
  const [products, setProducts] = React.useState([]);
  // thêm biến này vì sau khi dispatch login thì redux persit không ghi kịp current vào localstorage

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [arr, setArr] = React.useState([]);
  const [queries, setQueries] = React.useState({ page: 1 });
  // function
  const handleAddCart = async (id) => {
    //
    if (user.isLogged) {
      if (checkTokenIsExpire(user.token)) {
        dispatch(refreshToken());
        await delay(100);
      }
      // chờ đợi dữ liệu ghi vào localstorage từ redux persist bằng setTimeout 100ms

      await userApi
        .updateCart({ productId: id })
        .then((res) => {
          dispatch(getCurrent());
          console.log(res);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "SUCCESS",
            html: `Đã thêm 1 sản phẩm vào giỏ hàng!`,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        html: "Bạn vui lòng đăng nhập để tạo giỏ hàng!",
      });
    }
  };

  //
  React.useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const arr = [];
    // for (let i of param) paramQueries[i[0]] = i[1];
    for (let i of param) arr.push(i.join("="));
    const paramQueries = queryString.parse(arr.join("&"), {
      arrayFormat: "bracket",
    });
    (async function () {
      await productApi
        .filter(paramQueries)
        .then((res) => {
          const data = res.data.data;
          setProducts(data);
          setArr(paginationArr(res.data.count, 1));
        })
        .catch((err) => console.log(err));
    })();
  }, [params]);

  React.useEffect(() => {
    // console.log(queries);
    navigate({
      pathname: `/products/${category || ""}`,
      // search: createSearchParams(queries).toString(),
      search: queryString.stringify(queries, { arrayFormat: "bracket" }),
    });
  }, [queries]);

  return (
    <div className="w-[1200px] px-6 py-6 text-sm ">
      <div className="mt-4 flex justify-center bg-white px-[10px]">
        <Filter setQueries={setQueries} />
        <span className="cursor-pointer rounded-sm px-2 py-1 text-sm font-medium hover:bg-gray-100"></span>
      </div>
      {/* list products */}
      <ul className="mx-[-10px] mt-8 flex flex-wrap">
        {products.map((el, index) => (
          <li key={index} className="  mb-6 w-1/2 px-[10px] md:w-1/3 lg:w-1/4">
            <div className="flex h-full flex-col justify-between rounded-md border bg-white p-[20px_10px_20px] drop-shadow">
              <Link
                to={`/${el.category_id.name.toLowerCase()}/${el._id}/${
                  el.slug
                }`}
                className="group cursor-pointer"
              >
                <div className="mb-4 ">
                  <img
                    src={el.thumb[0].path}
                    className="relative transition-transform group-hover:translate-y-[-8px]"
                    alt="Image error!"
                  />
                </div>
              </Link>
              <div>
                {/* price */}
                <div>
                  <h3 className="capitalize">{el.name}</h3>
                  <span className="text-red-600">
                    {splitPrice(el.price)} VNĐ
                  </span>
                </div>
                {/* desc */}
                <div>
                  {el.desc.map((el, index) => (
                    <div key={index}>
                      <span className="capitalize">{el.name}: </span>
                      <span className="capitalize">{el.content}</span>
                    </div>
                  ))}
                </div>
                {/* show star */}
                {el.rating_avg > 0 && (
                  <div className="mt-4 flex justify-center">
                    {showStar(el.rating_avg).map((el, index) => (
                      <el.icon
                        key={index}
                        className="text-xl text-orange-600"
                      />
                    ))}
                  </div>
                )}

                {/*  */}
                {/* action */}
                <div className="mt-2 flex h-[40px] justify-around">
                  {(() => {
                    if (user.current) {
                      return user.current.cart?.some((elCart) => {
                        return elCart.product._id === el._id.toString();
                      }) ? (
                        <button
                          className={clsx(
                            "cursor-not-allowed rounded-md px-4 py-2 hover:bg-whiten",
                          )}
                          type="button"
                        >
                          <icons.IconCartCheckFill className="text-lg text-orange-600" />
                        </button>
                      ) : (
                        <button
                          className={clsx(
                            "rounded-md px-4 py-2 hover:bg-whiten",
                          )}
                          type="button"
                          onClick={() => handleAddCart(el._id)}
                        >
                          <icons.IconBxsCartAdd className="text-2xl" />
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className={clsx(
                            "rounded-md px-4 py-2 hover:bg-whiten",
                          )}
                          type="button"
                          onClick={() => handleAddCart(el._id)}
                        >
                          <icons.IconBxsCartAdd className="text-2xl" />
                        </button>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center ">
        <ul className="list-style-none flex ">
          {arr.map((el, index) => {
            if (el === "DOTS") el = "...";
            return (
              <li key={index}>
                <Link
                  onClick={() => {
                    if (Number(el))
                      setQueries((prev) => ({ ...prev, page: el }));
                  }}
                  className={clsx(
                    "relative block rounded bg-transparent px-3 py-1.5 text-base text-neutral-600 transition-all duration-100 hover:bg-white dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white",
                    {
                      "cursor-default hover:!bg-transparent": el === "...",
                      "bg-white text-red-600": el === queries.page,
                    },
                  )}
                  href="#"
                >
                  {el}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
