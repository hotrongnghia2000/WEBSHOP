import clsx from "clsx";

const InputField = (props) => {
  return (
    <div className="mt-4 flex w-full flex-col text-sm">
      <label htmlFor={props.fieldId} className=" text-gray-500">
        {props.label}
      </label>
      <input
        type={props.type ?? "text"}
        id={props.fieldId}
        placeholder={props.placeholder}
        className={clsx(
          `${props.className} appearance-none rounded-sm border border-gray-200 px-4 py-2 placeholder-gray-300 ring-focusborder focus-within:ring-1 focus:outline-none `,
          {
            "border-red-600": props.error,
          },
        )}
        {...(props.validator ?? {})}
        multiple={props.multiple}
      />
      <p className={clsx("h-4 text-sm text-red-600")}>{props.error}</p>
    </div>
  );
};

export default InputField;
