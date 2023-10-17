import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import productApi from "../../../apis/product";
import userApi from "../../../apis/user";
import { getCurrent, refreshToken } from "../../../app/user/asyncActions";
import Button from "../../../components/Button";
import icons from "../../../icons";
import {
  checkTokenIsExpire,
  delay,
  showStar,
  splitPrice,
} from "../../../utils/helpers";
import VoteBar from "./VoteBar";
import VoteOptions from "./VoteOptions";

const ProductDetail = () => {
  const [product, setProduct] = React.useState({});
  const [isModalVote, setIsModalVote] = React.useState(false);
  //
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  //

  //
  const SETTINGS = {
    dots: true,
    infinite: true,
    speed: 200,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <a>
          <img src={product?.images[i].path} />
        </a>
      );
    },
    dotsClass: "slick-dots slick-thumb",
  };
  // định nghĩa route tương ứng với từng breadcrumb
  const routes = [
    { path: "/:category", breadcrumb: params.category },
    { path: "/", breadcrumb: "Home" },
    {
      path: "/:category/:productId/:productName",
      breadcrumb: product.name,
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  // function
  const toggleVote = React.useCallback(() => {
    if (user.isLogged) setIsModalVote(!isModalVote);
    else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        html: "Bạn vui lòng đăng nhập để đánh giá sản phẩm!",
      });
    }
  }, [isModalVote]);

  const handleAddCart = async (id) => {
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
    //
  };
  //
  React.useEffect(() => {
    (async function () {
      await productApi
        .getOne(params.productId)
        .then((res) => {
          setProduct(res.data.data);
        })
        .catch((err) => console.log(err));
    })();
  }, [params]);
  return (
    <div className="mt-2 w-[1200px] bg-white p-4">
      {/* modal */}
      {isModalVote && (
        <div
          onClick={() => setIsModalVote(!isModalVote)}
          className="fixed inset-0 z-9999  flex items-center justify-center bg-[rgba(0,0,0,.5)]"
        >
          <VoteOptions
            id={product._id}
            setIsModalVote={setIsModalVote}
            setProduct={setProduct}
          />
        </div>
      )}
      {/* Breadcrumbs */}
      <div className="flex">
        {breadcrumbs
          // loại bỏ những breadcrumb không thỏa với 1 route
          .filter((el) => !el.match.route === false)
          .map(({ match, breadcrumb }, index, self) => (
            <NavLink
              key={match.pathname}
              to={match.pathname}
              className="flex items-center capitalize "
            >
              <span className="text-cyan-600">{breadcrumb}</span>
              {index !== self.length - 1 && (
                <icons.IconCaretRight className="mx-1 inline-block" />
              )}
            </NavLink>
          ))}
      </div>
      {/* name product */}
      <h1 className="mt-4 border-b pb-2 text-lg font-bold capitalize text-black">
        {product?.name}
      </h1>
      {/* ProductDetail */}
      <div className="mt-4 flex">
        <div className="relative h-full w-7/12 pb-[var(--paging-height)]">
          <Slider {...SETTINGS}>
            {product?.images?.map((el, index) => (
              <div key={index}>
                <img src={el.path} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex w-5/12 flex-col justify-between">
          <div>
            <h3 className="text-center text-xl font-bold text-black">
              Thông tin chung
            </h3>
            {/* info */}
            <ul className="p-2">
              <li className="mb-2">
                Tên sản phẩm:
                <span className="font-bold capitalize"> {product.name}</span>
              </li>
              <li className="mb-2">
                Tên thương hiệu:
                <span className="font-bold"> {product.brand_id?.name}</span>
              </li>
              {product.desc?.map((el, index) => (
                <li key={index} className="mb-2 capitalize">
                  {el.name}:<span className="font-bold"> {el.content}</span>
                </li>
              ))}
              <li className="mb-2">
                Đã bán:
                <span className="font-bold"> {product.sold}</span>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="mb-[calc(var(--paging-height)+7px)] flex justify-center">
            <div>
              <div className="rounded-mdp-2 mb-2 text-center font-bold text-red-600">
                {splitPrice(product.price)} VNĐ
              </div>
              <Button primary onClick={() => handleAddCart(product._id)}>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* review */}
      <div className="w-full ">
        <div className="flex border">
          <div className="ic flex w-4/12 items-center justify-center">
            <div className="flex flex-col items-center gap-2 ">
              <div className="text-lg font-bold">{product.rating_avg}/5</div>
              <div className="flex">
                {showStar(product?.rating_avg).map((el, index) => (
                  <el.icon key={index} className="text-xl text-orange-600" />
                ))}
              </div>
              <div>
                <span className="font-bold">{product?.ratings?.length}</span>{" "}
                lượt đánh giá và nhận xét
              </div>
            </div>
          </div>
          <div className="w-8/12 border-l p-2">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el, index) => {
                const count = product?.ratings?.filter(
                  (elRating) => elRating.star === el + 1,
                ).length;
                return (
                  <VoteBar
                    key={el}
                    number={el + 1}
                    count={count}
                    total={product?.ratings?.length}
                    ratingAvg={product?.rating_avg}
                  />
                );
              })}
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <Button type="button" primary onClick={() => toggleVote()}>
            Đánh giá ngay
          </Button>
        </div>
        {/* show comment */}
        <div className="mt-12 flex flex-col gap-4 border-t">
          {!product?.comments?.length && (
            <div className="flex justify-center font-bold">
              <div className="text-center">
                <p>Chưa có có comment nào!</p>
                <p>Bạn hãy là người comment đầu tiên!</p>
              </div>
            </div>
          )}
          {product?.comments?.map((el, index) => {
            return (
              <div key={index} className="mt-2 flex gap-4 ">
                <div>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 p-4 capitalize">
                    {el.user_id.email.split("@")[0].charAt(0)}
                  </div>
                </div>
                {/* show star user comment đã đánh giá cho sản phẩm */}
                <div>
                  <div className="mt-1">{el.user_id.email.split("@")[0]}</div>
                  <div className="flex">
                    {showStar(
                      product?.ratings.find(
                        (elRating) => elRating.user_id === el.user_id._id,
                      ).star,
                    ).map((el, index) => (
                      <el.icon
                        key={index}
                        className="text-xl text-orange-600"
                      />
                    ))}
                  </div>
                  {/* content comment */}
                  <div className="mt-2">
                    <p className="text-sm">{el.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
