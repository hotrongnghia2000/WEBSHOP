import clsx from "clsx";
import React from "react";
import { Controller } from "react-hook-form";

const InputField = (props) => {
  return (
    <div className="mt-4 flex w-full flex-col text-sm">
      <label htmlFor={props.fieldId} className=" text-gray-500">
        {props.label}
      </label>
      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.fieldId}
        render={({ field: { onChange } }) => (
          <input
            type={props.type ?? "text"}
            id={props.fieldId}
            placeholder={props.placeholder}
            className={clsx(
              `${props.className} appearance-none rounded-sm border border-gray-200 px-4 py-2 placeholder-gray-300 ring-focusborder focus-within:ring-1 focus:outline-none `,
              {
                "border-red-600": props.error,
                "border-green-600": props.isDirty,
              },
            )}
            {...(props.validator ?? {})}
            multiple={props.multiple}
            onChange={(e) => {
              onChange(e.target.value);
              if (props.type === "file") {
                if (e.target.files) {
                  const files = e.target.files;
                  let arr = [];
                  for (const key in files) {
                    if (files && files[key] && files[key].type) {
                      arr.push(URL.createObjectURL(files[key]));
                    }
                  }
                  props.setFiles(arr);
                }
              } else props.setValue(e.target.value);
            }}
            value={props.value}
          />
        )}
      />

      <p className={clsx("h-4 text-sm text-red-600")}>{props.error}</p>
    </div>
  );
};

export default InputField;
