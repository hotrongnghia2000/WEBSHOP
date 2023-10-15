import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import productApi from "../../../apis/product";
import Button from "../../../components/Button";
import TextAreaField from "../../../components/TextAreaField";
import icons from "../../../icons";
import * as contants from "../../../utils/constants";
import { updateOjectArray } from "../../../utils/helpers";
import * as productSchema from "../../../validators/product";

const VoteOptions = (props) => {
  const [voteList, setVoteList] = React.useState(contants.voteOptions);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(productSchema.rate),
  });
  const onSubmit = async (data) => {
    console.log(data);
    await productApi
      .rate(data, props.id)
      .then((res) => {
        console.log(res);
        props.setIsModalVote((prev) => !prev);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SUCCESS",
          html: "<p>Cám ơn bạn đã đánh giá sản phẩm!!!<p/>",
          showConfirmButton: true,
          confirmButtonText: "Xác nhận",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex min-h-[400px]  w-[400px] flex-col rounded-md bg-white p-4"
    >
      <div className="flex justify-center">
        <icons.IconRankingStar className="text-6xl text-orange-500" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-between"
      >
        <TextAreaField
          control={control}
          placeholder="Click to search..."
          className="min-h-[100px] !p-1"
          setValue={() => {}}
          fieldId="comment"
        />
        {/* star field */}
        <div className="flex justify-between">
          {voteList.map((el, index) => (
            <div key={index} className=" p-2">
              <div className="flex justify-center">
                <button
                  {...register("star")}
                  type="button"
                  onClick={() => {
                    setVoteList(
                      updateOjectArray(contants.voteOptions, el.id, {
                        isSelected: true,
                      }),
                    );
                    setValue("star", el.id);
                  }}
                >
                  <icons.IconStar
                    className={clsx("text-xl", {
                      "text-orange-500": el.isSelected,
                    })}
                  />
                </button>
              </div>
              <div className="mt-4 text-sm">{el.content}</div>
            </div>
          ))}
        </div>
        {errors?.star && (
          <p className="text-center text-red-600">
            Bạn chưa chọn bất kì đánh giá nào!
          </p>
        )}
        <Button type="submit" primary>
          Gửi đánh giá
        </Button>
      </form>
    </div>
  );
};

export default VoteOptions;
