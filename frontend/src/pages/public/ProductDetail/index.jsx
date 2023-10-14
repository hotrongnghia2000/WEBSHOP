import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import productApi from "../../../apis/product";
import userApi from "../../../apis/user";
import { getCurrent } from "../../../app/user/asyncActions";
import Button from "../../../components/Button";
import icons from "../../../icons";
import { splitPrice } from "../../../utils";
import VoteBar from "./VoteBar";

const ProductDetail = () => {
  const [product, setProduct] = React.useState({});
  console.log(product);
  //
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
  const handleAddCart = async (id) => {
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
      <div className="w-full border">
        <div className="flex">
          <div className="w-4/12"></div>
          <div className="w-8/12 border-l p-2">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el, index) => (
                <VoteBar key={el} number={el + 1} count={1} total={5} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
