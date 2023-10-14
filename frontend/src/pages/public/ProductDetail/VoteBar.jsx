import React, { useRef } from "react";
import icons from "../../../icons";

const VoteBar = (props) => {
  const percentRef = useRef();
  //
  React.useEffect(() => {
    percentRef.current.style.cssText = `width: ${Math.round(
      (props.count * 100) / props.total,
    )}%`;
  }, [props.total]);
  return (
    <div className="my-2 flex items-center gap-2 px-2">
      <div className="flex w-[50px] items-center gap-1 text-sm">
        <span className="font-bold">{props.number}</span>
        <icons.IconStar className="text-xl text-orange-600" />
      </div>
      <div className="flex-1">
        {/* percent bar */}
        <div className="relative h-2 rounded-sm bg-slate-200">
          <div
            ref={percentRef}
            className="absolute z-1 h-2  rounded-sm bg-red-600"
          ></div>
        </div>
      </div>
      <div className="w-[100px] text-sm">1 reviewers</div>
    </div>
  );
};

export default VoteBar;
