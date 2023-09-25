import clsx from "clsx";
import { Link } from "react-router-dom";
const Button = (props) => {
  let Comp = "button";
  const myProps = { onClick: props.onClick };
  if (props.to) {
    myProps.to = props.to;
    Comp = Link;
  } else if (props.href) {
    myProps.href = props.href;
    Comp = "a";
  }
  return (
    <Comp
      {...myProps}
      type={Comp === "button" ? props.type || "button" : null}
      className={clsx(
        "rounded-lg border px-10 py-3 text-center  text-sm font-bold focus:outline-none",
        props.className,
        {
          "bg-blue-600 text-white hover:bg-blue-700": props.primary,
          "bg-red-600 text-white hover:bg-red-700": props.danger,
          "bg-orange-600 text-white hover:bg-orange-700": props.warning,
          "text-gray-500 hover:bg-black/10": props.default,
        },
      )}
    >
      {props.children}
      {props.name}
    </Comp>
  );
};

export default Button;
